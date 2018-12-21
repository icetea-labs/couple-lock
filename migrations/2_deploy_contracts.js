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

var lockLove = artifacts.require("./LockLove.sol");
var userList = artifacts.require("./UserList.sol");

module.exports = function(deployer, network, accounts) {
  if (network === "mainnet") return;
  deployer.deploy(userList).then(function(){
    console.log("Log Deploy:","-",accounts[0],"-",userList.address);
    return deployer.deploy(lockLove,userList.address);
  })
};