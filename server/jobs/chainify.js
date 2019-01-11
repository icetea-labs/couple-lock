//
// Upload data to chain
//

// This is to be run by a scheduler

// 1. Import truffle build JSON
// 2. Instance contract
// 3. Query all unsynced users
// 4. Add to blockchain
// 5. Exit

const UserContractJson = require("../../truffle/build/contracts/UserList.json");
const Web3 = require('web3');
const TruffleConfig = require("../../truffle/truffle-config").networks[process.env.mode || "development"];

const nodeUrl = `ws://${TruffleConfig.host}:${TruffleConfig.port}`;
let networkId = TruffleConfig.network_id;
if (networkId === "*") networkId = "5778";

const store = require('../services/factory');
store.select('user');

(async () => {
    const unchainedUsers = await store.list({chained: false});
    if (!unchainedUsers.length) {
        console.log("All users chained!");
        return;
    }

    const web3 = new Web3(nodeUrl);
    const contract = new web3.eth.Contract(UserContractJson.abi, UserContractJson.networks[networkId].address);

    //const privateKey = process.env.chainedPrivateKey;
    const privateKey = "c06a32e9fc74d8b5abf66bd34c455ce2b15ab0754a342ef9513fca54ebb0c4bd";
    const account = web3.eth.accounts.wallet.add('0x' + privateKey);
    
    for (const user of unchainedUsers) {

        // TODO
        // - should check already registered
        // - contract should allow the JOB account to register for other users
        // - contract should be able to check user signature

        try {
            // NOTE: have to wait for tx to mined before send next transaction or we'll get into nonce problem
            const receipts = await contract.methods.register(web3.utils.fromAscii(user.username), user.avatar)
            .send({
                from: account.address,
                gas: 1000000, // gas limit
                gasPrice: '2000000000' // 2 gwei
            })

            console.log(receipts);
            await store.update(user.username, {
                chained: Date.now()
            });

            console.log("done");
            console.log(await store.all());

        } catch(error) {
            console.error(error);
        }
    }

    process.exit();
})();


