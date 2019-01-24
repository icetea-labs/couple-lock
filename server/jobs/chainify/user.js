const CJSON = require("../../../truffle/build/contracts/UserList.json");
const BaseTask = require("./base");

class UserTask extends BaseTask {

    constructor() {
        super(CJSON, 'user', 'username');
    }
    async _doUploadSync(web3, contract, arrHash, unchainedItems) {
        // this.setJobAddress(web3,contract);
        let objsAddr =[],objsUsername=[],objsHash=[];
        //Serializing data before add blockchian
        for (const item of unchainedItems) {
            objsAddr.push(item.publicKey);
            objsUsername.push(web3.utils.fromAscii(item.username));
            objsHash.push(arrHash[item.username]);
        }
        return await contract.methods.uploadUser(objsAddr, objsUsername, objsHash).send();
    };

    async setJobAddress(web3,contract) {
        //Set Job Address
        let account = process.env.JOB_ADDRESS || (await web3.eth.getAccounts())[0];
        let isJobAddr = await contract.methods.isJobAddr(account).call();
        if(!isJobAddr)
            return await contract.methods.setJobAddress(account).send();
    };
};

module.exports = new UserTask();
