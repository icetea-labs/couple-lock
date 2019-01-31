var storage = require('node-persist');


var savedata = async (data) => {
    await storage.init({ dir: "datauser", ttl: 100000000000 })
    await storage.setItem("userdata", data)
    let result = await storage.getItem("userdata");
    return result;
}

var finddata = async function () {
    await storage.init({ dir: "datauser", ttl: 100000000000 })
    let result = await storage.getItem("userdata");
    return result;
  }

module.exports.finddata = finddata;
module.exports.savedata = savedata;
