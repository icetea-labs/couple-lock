const multihashes     = require('multihashes');

exports.ipfs2multihash = (hash) => {
    let mh = multihashes.fromB58String(Buffer.from(hash));
    return {
        hashFunction: '0x' + mh.slice(0, 2).toString('hex'),
        digest: '0x' + mh.slice(2).toString('hex'),
        size: mh.length - 2
    }
};

exports.multihash2hash = (digest, hashFunction) => {
        hashFunction = hashFunction || '0x1220';
        hashFunction = hashFunction.substr(2);
        digest = digest.substr(2);
    return {
        hash: multihashes.toB58String(multihashes.fromHexString(hashFunction + digest)),
    }
}