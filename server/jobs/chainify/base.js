const async         = require('async');
const msgpack       = require('msgpack');
const Buffer        = require('buffer').Buffer;
const zlib          = require('zlib');

const ipfs          = require('../upload/ipfs.js').get();
const utils         = require('../upload/utils.js');
const blockchain    = require('../../helpers/blockchain');
const factory       = require('../../services/factory');

const UPLOAD_IPFS_LIMIT   = 5;
const UPLOAD_CHAIN_LIMIT  = 5;

module.exports = class BaseTask {
    constructor(CJSON, entity, keyName) {
        this.CJSON = CJSON;
        this.entity = entity;
        this.keyName = keyName || 'id';
        this.store = factory.getStore(entity);
    }

    _doUploadSync(web3, contract, arrHash, unchainedItems) {
        throw new Error("Could not execute BaseTask directly!");
    }

    async run(web3, callback) {
        const unchainedItems = await this.store.list({ chained: false });
        var _none;
        if (!unchainedItems.length) {
            console.log(`All ${this.entity}(s) chained!`);
            return callback(null);
        }

        const privateKey = process.env.UPLOAD_PRIVATE_KEY;
        const account = web3.eth.accounts.wallet.add('0x' + privateKey);
        const contract = blockchain.contractFromJson(web3, this.CJSON, {
            from: account.address,
            gas: 10000000, // gas limit
            gasPrice: '2000000000' // 2 gwei
        });
        const funcs = {};
        let networkName = await web3.eth.net.getNetworkType();
        for (const item of unchainedItems) {
            let itemPacked  = msgpack.pack(item);
            let compressed  = zlib.deflateSync(itemPacked);
            // let path        = "/tmp/" + `${this.entity}` + ".txt"
            // let file = [{
            //       path: path,
            //       content:  ipfs.types.Buffer.from(JSON.stringify(item))
            //     }]
            funcs[item[this.keyName]] = (next) => {
                ipfs.add(compressed,{ 
                    pin:networkName == 'Main',
                    progress: (prog) => console.log(` ->IPFS upload progress: ${prog} byte added to ipfs.`),
                    onlyHash: true
                },
            next)};
        }
        console.log("------------------------ START WITH ",`${this.entity}`.toUpperCase(),"------------------------");
        async.auto({
            upToIpfs: (next) => {
                console.log(`Start upload ${this.entity} to ipfs.`,"(",Object.keys(funcs).length,"items)");
                async.parallelLimit(funcs, UPLOAD_IPFS_LIMIT, (err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    // console.log(Date.now(),"upToIpfs: ",result);
                    console.log(` Successful upload ${this.entity} to ipfs.`,"(",Object.keys(results).length,"items added)");
                    return next(null, results);
                });
            },
            upToChain: ['upToIpfs', async (results) => {
                console.log(`Start upload ${this.entity} to blockchian.`);
                let arrHash={};
                for (const item of unchainedItems) {
                    let hashConverted = utils.ipfs2multihash(results.upToIpfs[item[this.keyName]][0].hash);
                    arrHash[item[this.keyName]] = hashConverted.digest;
                }
                let receipts = await this._doUploadSync(web3, contract, arrHash, unchainedItems);
                // console.log(receipts);
                console.log(` Successful upload ${this.entity} to blockchian.`);
                return true;
            }],
            syncToDB: ['upToChain', async (results) => {
                console.log(`Start sync ${this.entity} to database.`);
                if(results.upToChain) {
                    for (const item of unchainedItems) {
                        await this.store.update(item[this.keyName], {
                            chained: Date.now()
                        });
                    }
                    console.log(` Successful sync ${this.entity} to database.`);
                };
                return results.upToChain;
            }]
        }, (err, results) => {
            if (err) {
                return callback(err);
            }
            
            if (results.upToChain === true) {
                console.log(`Successful upload ${this.entity} to ipfs and blockchian.`,err, results);
                return callback(null, true);
            }
            return callback(null, false);
        });
    }
}