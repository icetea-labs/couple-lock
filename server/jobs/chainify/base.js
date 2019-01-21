const async         = require('async');
const ipfs          = require('../upload/ipfs.js').get();
const blockchain    = require('../../helpers/blockchain');
const factory       = require('../../services/factory');


module.exports = class BaseTask {
    constructor(JSON, entity, keyName) {
        this.JSON = JSON;
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
            return;
        }

        const privateKey = process.env.UPLOAD_PRIVATE_KEY;
        const account = web3.eth.accounts.wallet.add('0x' + privateKey);
        const contract = blockchain.contractFromJson(web3, this.JSON, {
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
            let networkName = await web3.eth.net.getNetworkType();
            index++;
            funcs[index] = function (next) {
                ipfs.addJSON(JSON.stringify(item,{ pin:networkName == 'Main' }),next);
            }
        }

        async.auto({
            getHash: function(next) {
                console.log('getHash');
                async.parallelLimit(funcs, 5, (err, result) => {
                    if (err) {
                        alert(err);
                        console.log(err);
                        return next(err);
                    }
                    // console.log(Date.now()," get_hash: ",result);
                    return next(null, result);
                });
            },
            upToChain: ['getHash', async (results) => {
                console.log('upToChain');
                let arrHash = results.getHash, index = 0;
                for (const item of unchainedItems) {
                    try {
                        // NOTE: have to wait for tx to mined before sending next transaction
                        // or we'll run into nonce problem
                        index++;
                        const receipts = await this._doUploadSync(web3, contract, item, arrHash[index]);
                        // console.log(receipts);
                        await store.update(item[this.keyName], {
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
            console.log("Index series: ",err, results);
            if (err) {
                return callback(err);
            }
        
            if (results.upToChain === true) {
                return callback(null, true);
            }
        });
    }
}