pragma solidity >=0.5;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IUserList {
    function isAddrRegistered(address _who) external view returns(bool);
    function isNickRegistered(bytes32 _nick) external view returns(bool);
    function isJobAddr(address _isAddrJob) external view returns(bool);
}


contract LovePropose is Ownable {
    
    IUserList public userList;
    
    struct Propose {
        address sender;
        address receiver;
        bytes32 infoHash;
    }

    Propose[] public lsPropose;
    string[] public lsComment;
    //Map ID Propose -> index list Propose: index = idToIndex - 1;
    mapping (bytes32 => uint) public idToIndex;
    //Map Propose: User -> Array Propose
    // mapping (address => uint[]) public userToPropose;
    event NewPropose(bytes32 _id, bytes32 infoHash);

    // Map comment: Propose ID -> Array comment 
    mapping (bytes32 => uint[]) public proIdToComment;
    event NewComment(bytes32 proId, string commentHash);

    //Map like: Propose ID -> Array liker 
    mapping (bytes32 => address[]) public mpLike;
    event NewLike(bytes32 _id, address sender);

    constructor (IUserList _userList) public {
        require(address(_userList) != address(0), "Contract UserList address must be different 0x0.");
        userList = _userList;
    }

    modifier onlyRegiter {
        require(userList.isAddrRegistered(msg.sender), "User must be regiter.");
        _;
    }

    modifier onlyJob {
        require(userList.isJobAddr(msg.sender), "Function only for job.");
        _;
    }

    function setUserList(IUserList _userList) public onlyOwner {
        userList = _userList;
    }

    function isOwnerPropose(address _who, bytes32 _id) public view returns(bool) {
        return (idToIndex[_id] != 0) && (_who == lsPropose[idToIndex[_id] - 1].sender || _who == lsPropose[idToIndex[_id] - 1].receiver);
    }

    // Send Propose.
    function addPropose(address _receiver, bytes32 _infoHash) public onlyRegiter {
        ///Do Sent Propose
        doAddPropose(byte(0), msg.sender, _receiver, _infoHash);
    }

    // Upload Propose.
    function uploadPropose(bytes32[] memory _id, address[] memory _sender, address[] memory _receiver, bytes32[] memory _infoHash) public onlyJob {
        uint len = _id.length;
        ///Do Sent Propose
        for (uint i = 0; i < len; i++) {
            doAddPropose(_id[i], _sender[i], _receiver[i], _infoHash[i]);
        }
    }

    function getAllPropose() public view returns(address[] memory lsSender, address[] memory lsReceiver, bytes32[] memory infoHash) {
        uint len = lsPropose.length;
        lsSender = new address[](len);
        lsReceiver = new address[](len);
        infoHash = new bytes32[](len);
        
        for (uint i = 0; i < len; i++) {
            lsSender[i] = lsPropose[i].sender;
            lsReceiver[i] = lsPropose[i].receiver;
            infoHash[i] = lsPropose[i].infoHash;
        }
    }

    // ****** Like ****** 
    function sentLike(bytes32 _id) public {
        require(idToIndex[_id] != 0, "Propose id don't exist!");
        //Add address liker to map
        mpLike[_id].push(msg.sender);
        emit NewLike(_id, msg.sender);
    }

    // ****** Comment ****** 
    function addComment(bytes32 _id, string memory _commentHash) public {
        require(idToIndex[_id] != 0, "Propose id don't exist!");
        uint id = lsComment.push(_commentHash) - 1;
        proIdToComment[_id].push(id);
        emit NewComment(_id, _commentHash);
    }

    //
    function getCommentByProID(bytes32 _id) public view returns (string memory commentHash) {
        uint len = proIdToComment[_id].length;
        bytes memory hashCollect;
        for (uint i = 0; i < len; i++) {
            hashCollect = abi.encodePacked(hashCollect, bytes(lsComment[proIdToComment[_id][i]]), byte(0));//byte(0)
        }
        commentHash = string(hashCollect);
    }

    // Do Send Propose.
    function doAddPropose(bytes32 _id, address _sender, address _receiver, bytes32 _infoHash) private {
        require(idToIndex[_id] == 0, "Propose id existed!");
        require(_sender != _receiver, "Sender must be different with receiver address!");

        //Create new pending
        Propose memory newPro = Propose(_sender, _receiver, _infoHash);
        uint index = lsPropose.push(newPro);
        if (_id == byte(0))  
            _id = bytes32(index);
        //Add ID mapping: index = idToIndex - 1;
        idToIndex[_id] = index;
        // userToPropose[_sender].push(index);
        // userToPropose[_receiver].push(index);

        //Rase event new pedding request.
        emit NewPropose(_id, _infoHash);
    }
}