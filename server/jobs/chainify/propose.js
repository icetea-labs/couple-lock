const CJSON = require("../../../truffle/build/contracts/LovePropose.json");
const BaseTask = require("./base");

class ProposeTask extends BaseTask {

    constructor() {
        super(CJSON, 'propose');
    }

    async _doUploadSync(web3, contract, item, hashValue) {
          return await contract.methods.uploadPropose(web3.utils.fromAscii(item.id),item.s_address,item.r_address,hashValue).send();
        }
};

module.exports = new ProposeTask();
