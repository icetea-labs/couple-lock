const Web3 = require('web3');
const TruffleConfig = require("../../truffle/truffle-config").networks[process.env.NODE_ENV || "development"];

const nodeUrl = `ws://${TruffleConfig.host}:${TruffleConfig.port}`;
let networkId = TruffleConfig.network_id;
if (networkId === "*") networkId = "5778";

module.exports = new Web3(nodeUrl);