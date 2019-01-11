const JSON = require("../../../truffle/build/contracts/LoveMemory.json");
const BaseTask = require("./base");

class MemoryTask extends BaseTask {

    constructor() {
        super(JSON, 'memory');
    }

    async _doUploadSync(web3, contract, item) {
        //return await contract.methods.addMemory(item).send();
        return("Not implemented");
    }

};

module.exports = new MemoryTask();