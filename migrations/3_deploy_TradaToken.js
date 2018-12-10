var TradaToken = artifacts.require('./TradaToken.sol');

module.exports = function(deployer){
    deployer.deploy(TradaToken);
}