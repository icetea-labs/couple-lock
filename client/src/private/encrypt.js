import aesjs from 'aes-js';

var encryptMessage = function encryptS_key(message, key) {

    // key Side to uinit8
    try {

        // Convert key to  128bit(key 128);
        var key_bytes = aesjs.utils.utf8.toBytes(key);

        console.log(key_bytes);

        // TODO: create aesCtr
        var aesCtr = new aesjs.ModeOfOperation.ctr(key_bytes, new aesjs.Counter(5));

        // TODO: data to bytes
        var data = aesjs.utils.utf8.toBytes(message);

        // TODO: encrypt data
        var dataEncrypt = aesCtr.encrypt(data);

        // TODO: convert to hexString
        var messageHex = aesjs.utils.hex.fromBytes(dataEncrypt);
    } catch (err) {
        console.log(err);
    }
    

    return {
        messageHex
    }
}


export default encryptMessage;