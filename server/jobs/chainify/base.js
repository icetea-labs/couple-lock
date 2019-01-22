const async         = require('async');
const ipfs          = require('../upload/ipfs.js').get();
const blockchain    = require('../../helpers/blockchain');
const factory       = require('../../services/factory');
const msgpack       = require('msgpack');

const BATCH_IPFS_LIMIT  = 5;

module.exports = class BaseTask {
    constructor(CJSON, entity, keyName) {
        this.CJSON = CJSON;
        this.entity = entity;
        this.keyName = keyName || 'id';
        this.store = factory.getStore(entity);
    }

    _doUploadSync(web3, contract, item, strhash) {
        throw new Error("Could not execute BaseTask directly!");
    }

    async run(web3, callback) {
        const unchainedItems = await this.store.list({ chained: false });
        if (!unchainedItems.length) {
            console.log(`All ${this.entity}(s) chained!`);
            callback(null);
            // return;
        }

        const privateKey = process.env.UPLOAD_PRIVATE_KEY;
        const account = web3.eth.accounts.wallet.add('0x' + privateKey);
        const contract = blockchain.contractFromJson(web3, this.CJSON, {
            from: account.address,
            gas: 1000000, // gas limit
            gasPrice: '2000000000' // 2 gwei
        });
        const funcs = {};
        let index = 0;
        for (const item of unchainedItems) {
            // NOTE: have to wait for tx to mined before sending next transaction
            // or we'll run into nonce problem
            //msg pack
            let itemPacked = msgpack.pack(JSON.stringify(item));
            // console.log(`-- ${this.entity}`, itemPacked);
            // let itemUnPack = msgpack.unpack(itemPacked);
            // console.log(`-- ${this.entity}`, itemUnPack);

            let networkName = await web3.eth.net.getNetworkType();
            index++;
            funcs[index] = function (next) {
                ipfs.addJSON(itemPacked,{ pin:networkName == 'Main' },next);
            }
        }
        callback(null);
        return;
        async.auto({
            upToIpfs: (next) => {
                console.log(`Start upload ${this.entity} to ipfs.`);
                async.parallelLimit(funcs, BATCH_IPFS_LIMIT, (err, result) => {
                    if (err) {
                        alert(err);
                        console.log(err);
                        return next(err);
                    }
                    // console.log(Date.now()," get_hash: ",result);
                    console.log(`Successful upload ${this.entity} to ipfs.`);
                    return next(null, result);
                });
            },
            upToChain: ['upToIpfs', async (results) => {
                console.log(`Start upload ${this.entity} to blockchian.`);
                let arrHash = results.upToIpfs, index = 0;
                for (const item of unchainedItems) {
                    try {
                        // NOTE: have to wait for tx to mined before sending next transaction
                        // or we'll run into nonce problem
                        index++;
                        const receipts = await this._doUploadSync(web3, contract, item, arrHash[index]);
                        // console.log(receipts);
                        await this.store.update(item[this.keyName], {
                            chained: Date.now()
                        });
                        console.log(`Successful upload ${this.entity} with ${this.keyName} of ${item[this.keyName]}`);
                        //console.log(await store.all());
                    } catch (error) {
                        console.log(`Failed upload ${this.entity} with ${this.keyName} of ${item[this.keyName]}`);
                        console.error(error);
                        throw error;
                    }
                }
                return true;
            }]
        }, (err, results) => {
            console.log(`Successful upload ${this.entity} to ipfs and blockchian.`,err, results);
            console.log("--------------------------------NEXT----------------------------------");
            if (err) {
                return callback(err);
            }
        
            if (results.upToChain === true) {
                return callback(null, true);
            }
        });
    }
}