const TruffleConfig = require("../../truffle/truffle-config").networks[process.env.MODE || "development"];
let networkId = TruffleConfig.network_id;
if (networkId === "*") networkId = "5778";

exports.contractFromJson = (web3, json, options) => {
    return new web3.eth.Contract(json.abi, json.networks[networkId].address, options);
}
