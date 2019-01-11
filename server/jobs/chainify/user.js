const JSON = require("../../../truffle/build/contracts/UserList.json");
const BaseTask = require("./base");

class UserTask extends BaseTask {

    constructor() {
        super(JSON, 'user', 'username');
    }

    async _doUploadSync(web3, contract, item) {
        return await contract.methods.register(web3.utils.fromAscii(item.username), item.avatar).send();
    }

};

module.exports = new UserTask();
