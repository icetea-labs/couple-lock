import aesjs from 'aes-js';
import { TextDecoder } from 'text-encoding';

var decryptMessage = function encryptS_key(messageHex, key) {
    try {
        // key Side to uinit8
        var key_bytes = aesjs.utils.utf8.toBytes(key);

        // console.log(this.inforNoti.s_key);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key_bytes, new aesjs.Counter(5));

        // messageHex to messageBytes
        var dataEncrypt = aesjs.utils.hex.toBytes(messageHex);

        // Decrypt messageBytes
        var messageBytes = aesCtr.decrypt(dataEncrypt);

        // To String message
        var messageEncrypt = new TextDecoder('utf8').decode(messageBytes);
    } catch(err) {
        console.log(err);
    }
    
    return {
        messageEncrypt
    }
}


export default decryptMessage;