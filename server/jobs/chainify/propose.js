const CJSON = require("../../../truffle/build/contracts/LovePropose.json");
const BaseTask = require("./base");

class ProposeTask extends BaseTask {

    constructor() {
        super(CJSON, 'propose');
    }

    async _doUploadSync(web3, contract, arrHash, unchainedItems) {
        let objsId=[], objsAddrSender =[],objsAddrreceiver =[],objsHash=[];
        //Serializing data before add blockchian
        for (const item of unchainedItems) {
            objsId.push(web3.utils.fromAscii(item.id));
            objsAddrSender.push(item.s_address);
            objsAddrreceiver.push(item.r_address);
            objsHash.push(arrHash[item.id]);
            console.log("pro: ",arrHash[item.id]);
        }
        return await contract.methods.uploadPropose(objsId, objsAddrSender, objsAddrreceiver, objsHash).send();
    }
};

module.exports = new ProposeTask();
