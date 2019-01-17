const blockchain = require('../../helpers/blockchain');
const factory = require('../../services/factory');

module.exports = class BaseTask {
    constructor(JSON, entity, keyName) {
        this.JSON = JSON;
        this.entity = entity;
        this.keyName = keyName || 'id';
        this.store = factory.getStore(entity);
    }

    _doUploadSync(web3, contract, item) {
        throw new Error("Could not execute BaseTask directly!");
    }

    async run(web3) {
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

        for (const item of unchainedItems) {

            try {

                // NOTE: have to wait for tx to mined before sending next transaction
                // or we'll run into nonce problem

                const receipts = await this._doUploadSync(web3, contract, item);
                //console.log(receipts);

                await this.store.update(item[this.keyName], {
                    chained: Date.now()
                });

                console.log(`Successful upload ${this.entity} with ${this.keyName} of ${item[this.keyName]}`);
                //console.log(await this.store.all());

            } catch (error) {
                console.log(`Failed upload ${this.entity} with ${this.keyName} of ${item[this.keyName]}`);
                console.error(error);
            }
        }
    };
}