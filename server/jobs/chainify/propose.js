const JSON = require("../../../truffle/build/contracts/LovePropose.json");
const BaseTask = require("./base");

class ProposeTask extends BaseTask {

    constructor() {
        super(JSON, 'propose');
    }

    async _doUploadSync(web3, contract, item) {
        //return await contract.methods.propose(item).send();
        return("Not implemented");
    }

};

module.exports = new ProposeTask();
