import _ from 'lodash';
import async from 'async';
import moment from 'moment';
import 'truffle-contract';
import shoutRoomJSON from '../build/contracts/LockLove.json';
import userListJSON from '../build/contracts/UserList.json';
import './style.css';

var app = {
    instances: {},
    templates: {},
    data: {
        shouts: {},
    },
    cache: {
        blockTime: {},
        usernames: {}
    },
    index:0
}

function init() {

    // Init contracts

    var provider = (typeof web3 !== 'undefined') ? web3.currentProvider
        : new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

    var shoutContract = TruffleContract(shoutRoomJSON);
    shoutContract.setProvider(provider);
    shoutContract.deployed().then(function(instance) {
        // save for later use
        app.instances.LockLove = instance;

        // load recent chat messages
        loadOldShouts(instance);
    });

    var userContract = TruffleContract(userListJSON);
    userContract.setProvider(provider);
    userContract.deployed().then(function(instance) {
        // save for later use
        app.instances.userList = instance;
    });

    // Load templates
    app.templates.shout_item = document.getElementById("shoutTemplate").textContent;

}

function applyTemplate(template, data) {
    _.each(data, function (value, key) {
        template = template.split("#{" + key + "}").join(value);
    })
    return template;
}

function createTag(html) {
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild;
}

function formatAddr(addr) {
    return addr.substr(0, 5) + "…" + addr.substr(-3);
}

function makeAvatarUrl(hash, account) {
    if (hash) {
        return "https://gateway.ipfs.io/ipfs/" + hash;
    }

    return "http://i.pravatar.cc/150?u=" + account;
}

function processShout(item, callback,index) {
    async.parallel({
        when: function(next) {
            getTimestamp(item, next);
        },
        fromUser: function(next) {
            getUser(item.args.formAddress, next);
        },
        toUser: function(next) {
            getUser(item.args.toAddress, next);
        },
        numLike: function(next) {
          getLike(index,next);
        }
    }, function(err, data){
        if (err) {
            return callback(err, null);
        }
        // console.log("data: ",data)
        var theItem = {
            avatar: makeAvatarUrl(data.fromUser.avatarHash, item.args.formAddress),
            formAddr: item.args.formAddress,
            formUsername: data.fromUser.username || formatAddr(item.args.formAddress),
            toAddr: item.args.toAddress,
            toUsername: data.toUser.username || formatAddr(item.args.toAddress),
            when: data.when,
            ago: data.when.fromNow(),
            formPromise: item.args.formPromise,
            like: data.numLike,
            index: index
        };
        callback(null, theItem);
    })
}

function getTimestamp(item, callback) {
    var cache = app.cache.blockTime[item.blockNumber];
    if (cache) {
        return callback(null, cache);
    }
    web3.eth.getBlock(item.blockNumber, function (err, block) {
        var timestamp = moment.unix(block.timestamp);
        app.cache.blockTime[item.blockNumber] = timestamp;
        callback(err, timestamp);
    });
}

function getUser(addressUser, callback) {
    var cache = app.cache.usernames[addressUser];
    if (cache) {
        return callback(null, cache);
    }
    app.instances.userList.getUserByAddr(addressUser).then(function(value) {
        callback(null, {
            username: web3.toUtf8(value[0]),
            avatarHash: value[1]
        });
    }).catch(function(err) {
        console.log(err);
        callback(err, null);
    })
}

function getLike(index,callback) {
    app.instances.LockLove.getLikePending(index).then(function(value) {
      //console.log("getLike:",value[0],"-",value[1].c[0],"-",value[0].length);
      callback(null,value[0].length);
    }).catch(function(err) {
        console.log(err);
        callback(err, null);
    })
}

function loadOldShouts(instance) {
    instance.NewPending({}, {fromBlock: 0 }).get(function (err, shouts) {
        var funcs = {};
        console.log(shouts);
        _.each(shouts, function (item) {
            funcs[item.transactionHash] = function (next) {
                processShout(item, next,app.index);
                app.index++;
            }
        });
        async.parallelLimit(funcs, 20, function (err, result) {
            app.data.shouts = result;

            // need to sort to ensure display in order
            var sortedArray = [];
            _.each(result, function(item) {
                sortedArray.push(item);
            });
            sortedArray = _.sortBy(sortedArray, ["when"]);
            _.each(sortedArray, showShout);

            // watch for new shout
            instance.NewPending().watch(function(err, item) {
                if (app.data.shouts[item.transactionHash]) return;
                processShout(item, function(err, theItem) {
                    showShout(theItem);
                },app.index)
                app.index++;
            })
        })
    })
}

function showShout(item) {
    var node = createTag(applyTemplate(app.templates.shout_item, item));
    var board = document.querySelector(".board");
    board.insertBefore(node, board.firstChild);
    node.getElementsByClassName("button-like")[0].addEventListener('click', clickLike, false);
}

function clickLike() {
    var account = web3.eth.accounts[0];
    if (!account) {
        alert("Please sign-in MetaMask.");
        return;
    }
    var index = this.getAttribute("data-id");
    alert(index);
    app.instances.LockLove.clickLikePending(index,account, {
        from: account,
        gas: 10000000, // gas limit
        gasPrice: '15000' // 15 gwei
      }).catch(function(err){
        alert(err);
      })
}

function wireEvents() {
    document.getElementById("shoutForm").addEventListener("submit", function(event){
        event.preventDefault();
        
        var text = document.getElementById("shoutText").value.trim();
        var toAddress = document.getElementById("toAddress").value.trim();
        if (!text.length) {
            alert("Please input content before shouting!");
            return;
        }

        var account = web3.eth.accounts[0];
        if (!account) {
            alert("Please sign-in MetaMask.");
            return;
        }
        app.instances.userList.isAddrRegistered(account).then(function(registered){
            if (!registered) {
                window.location.href = "/register.html";
                return;
            } else {
                app.instances.LockLove.sentPending(toAddress,text, {
                    from: account,
                    gas: 10000000, // gas limit
                    gasPrice: '15000' // 15 gwei
                }).catch(function(err){
                    alert(err);
                })
            }
        });

    }, false);
}

(function start() {
    if (web3.version.network === "1") {
        alert("You are on MAINNET, please switch to a testnet then refresh page!");
        return;
    }
    init();
    wireEvents();
})();