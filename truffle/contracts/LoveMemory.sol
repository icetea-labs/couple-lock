pragma solidity >=0.5;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IUserList {
    function isAddrRegistered(address _who) external view returns(bool);
    function isNickRegistered(bytes32 _nick) external view returns(bool);
    function isJobAddr(address _isAddrJob) external view returns(bool);
}


interface ILovePropose {
    function isOwnerPropose(address _who, bytes32 _id) external view returns(bool);
}


contract LoveMemory is Ownable {
    
    IUserList public userList;
    ILovePropose public lovePropose;

    bytes32[] public lsMemory;
    string[] public lsComment;
    //Map memory id -> index list memory:index = idToIndex -1;
    mapping (bytes32 => uint) public idToIndex;

    // Map memory: Propose ID -> Array Memory
    mapping (bytes32 => bytes32[]) public proIdToMemories;
    event NewMemory(bytes32 memoId, bytes32 proId, bytes32 hashInfo);
    
    // Map comment: Memory ID -> Array comment 
    mapping (bytes32 => uint[]) public memoIdToComments;
    event NewComment(bytes32 memoId, string commentHash);

    //Map like: Memory ID -> Array liker 
    mapping (bytes32 => address[]) public mpLike;
    event NewLike(bytes32 _id, address sender);

    constructor (IUserList _userList, ILovePropose _lovePropose) public {
        require(address(_userList) != address(0));
        require(address(_lovePropose) != address(0));
        userList = _userList;
        lovePropose = _lovePropose;
    }

    function setUserList(IUserList _userList, ILovePropose _lovePropose) public onlyOwner {
        userList = _userList;
        lovePropose = _lovePropose;
    }

    modifier onlyRegiter {
        require(userList.isAddrRegistered(msg.sender));
        _;
    }

    modifier onlyJob {
        require(userList.isJobAddr(msg.sender));
        _;
    }

    // ****** Memory ****** 
    function addMemory(bytes32 _proId, bytes32 _hashInfo) public onlyRegiter {
        doAddMemory(msg.sender, byte(0), _proId, _hashInfo);
    }

    // ****** Memory ****** 
    function uploadMemory(bytes32[] memory _memoId, bytes32[] memory _proId, address[] memory _sender, bytes32[] memory _hashInfo) public onlyJob {
        uint len = _memoId.length;
        ///Do Sent Propose
        for (uint i = 0; i < len; i++) {
            doAddMemory(_sender[i], _memoId[i], _proId[i], _hashInfo[i]);
        }
    }

    function getAllMemory(bytes32 _id) public view returns (bytes32[] memory memoriesHash) {
        uint len = proIdToMemories[_id].length;
        memoriesHash = new bytes32[](len);
        for (uint i = 0; i < len; i++) {
            memoriesHash[i] = lsMemory[idToIndex[proIdToMemories[_id][i]] - 1];
        }
    }

    // ****** Like ****** 
    function sentLike(bytes32 _id) public {
        require(idToIndex[_id] != 0, "Memory id don't exist!");
        //Add address liker to map
        mpLike[_id].push(msg.sender);
        emit NewLike(_id, msg.sender);
    }

    //
    function addComment(bytes32 _id, string memory _commentHash) public {
        require(idToIndex[_id] != 0, "Memory id don't exist!");
        uint id = lsComment.push(_commentHash) - 1;
        memoIdToComments[_id].push(id);
        emit NewComment(_id, _commentHash);
    }

    //
    function getCommentByMemoID(bytes32 _id) public view returns (string memory commentHash) {
        uint len = memoIdToComments[_id].length;
        bytes memory hashCollect;
        for (uint i = 0; i < len; i++) {
            hashCollect = abi.encodePacked(hashCollect, bytes(lsComment[memoIdToComments[_id][i]]), byte(0));//byte(0)
        }
        commentHash = string(hashCollect);
    }

    // ****** Memory ****** 
    function doAddMemory(address _sender, bytes32 _memoId, bytes32 _proId, bytes32 _hashInfo) private {
        require(idToIndex[_memoId] == 0, "Memory id existed!");
        require(lovePropose.isOwnerPropose(_sender, _proId), "Sender must be owner propose!");
        uint index = lsMemory.push(_hashInfo);
        if (_memoId == byte(0))
            _memoId = bytes32(index);
         //Add ID mapping: index = idToIndex - 1;
        idToIndex[_memoId] = index;           
        proIdToMemories[_proId].push(_memoId); 
        emit NewMemory(_memoId, _proId, _hashInfo);
    }
}