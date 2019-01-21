const CJSON = require("../../../truffle/build/contracts/LoveMemory.json");
const BaseTask = require("./base");

class MemoryTask extends BaseTask {

    constructor() {
        super(CJSON, 'memory');
    }

    async _doUploadSync(web3, contract, item, hashValue) {
        return await contract.methods.uploadMemory(web3.utils.fromAscii(item.id),web3.utils.fromAscii(item.proposeId),item.address,hashValue).send();
    }

};

module.exports = new MemoryTask();