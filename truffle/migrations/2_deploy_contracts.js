// var UserList = artifacts.require("./UserList.sol");
// var ShoutRoom = artifacts.require("./ShoutRoom.sol");

// module.exports = async (deployer, network) => {
//   if (network === "mainnet") return;
//   deployer.deploy(UserList).then(function() {
//     return deployer.deploy(ShoutRoom, UserList.address).catch(function(err) {
//       console.log("ShoutRoom ERR: ", err)
//     });
//   });
// };
var userList = artifacts.require("./UserList.sol");
var lovePropose = artifacts.require("./LovePropose.sol");
var loveMemory = artifacts.require("./LoveMemory.sol");

module.exports = function(deployer, network, accounts) {
  if (network === "mainnet") return;
  deployer.deploy(userList).then(function(){ 
    console.log("Log Deploy1:","-",accounts[0],"-",userList.address);
    return deployer.deploy(lovePropose,userList.address).then(function(){
      console.log("Log Deploy2:","-",accounts[0],"-",lovePropose.address);
      return deployer.deploy(loveMemory,userList.address,lovePropose.address);
    });
  });
};