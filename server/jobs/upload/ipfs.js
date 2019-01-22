// const IPFS = require("nano-ipfs-store");
// const ipfs = IPFS.at("https://ipfs.infura.io:5001");
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
module.exports = {
    get: function() {
        return ipfs;
    }
}