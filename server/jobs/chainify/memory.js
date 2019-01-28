const CJSON = require("../../../truffle/build/contracts/LoveMemory.json");
const BaseTask = require("./base");

class MemoryTask extends BaseTask {

    constructor() {
        super(CJSON, 'memory');
    }

    async _doUploadSync(web3, contract, arrHash, unchainedItems) {
        let objsId=[], objsProposeId =[],objsAddrSender =[],objsHash=[];
        //Serializing data before add blockchian
        for (const item of unchainedItems) {
            objsId.push(web3.utils.fromAscii(item.id));
            objsProposeId.push(web3.utils.fromAscii(item.proposeId));
            objsAddrSender.push(item.address);
            objsHash.push(arrHash[item.id]);
        }
        return await contract.methods.uploadMemory(objsId, objsProposeId, objsAddrSender, objsHash).send();
    }
};

module.exports = new MemoryTask();