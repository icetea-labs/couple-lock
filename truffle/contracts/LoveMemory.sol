pragma solidity >=0.5;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IUserList {
    function isAddrRegistered(address _who) external view returns(bool);
    function isNickRegistered(bytes32 _nick) external view returns(bool);
    function isJobAddr(address _isAddrJob) external view returns(bool);
}


interface ILovePropose {
    function isOwnerPropose(address _who, uint _index) external view returns(bool);
}


contract LoveMemory is Ownable {
    
    IUserList public userList;
    ILovePropose public lovePropose;

    string[] public lsMemory;
    string[] public lsComment;
    
    // Map memory: Propose ID -> Array Memory
    mapping (uint => uint[]) public proposeToMemories;
    event NewMemory(uint index, uint proposeIndex, string hashInfo);
    
    // Map comment: Memory ID -> Array comment 
    mapping (uint => uint[]) public memoryToComments;
    event NewComment(uint index, string commentHash);

    //Map like: Memory ID -> Array liker 
    mapping (uint => address[]) public mpLike;
    event NewLike(address fAddress);

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
    function addMemory(uint _index, string memory _hashInfo) public onlyRegiter {
        doAddMemory(msg.sender, _index, _hashInfo);
    }

    // ****** Memory ****** 
    function uploadMemory(uint _index, address _sender, string memory _hashInfo) public onlyJob {
        doAddMemory(_sender, _index, _hashInfo);
    }

    function getAllMemory(uint _index) public view returns (string memory _hashInfo) {
        uint len = proposeToMemories[_index].length;
        bytes memory hashCollector;
        for (uint i = 0; i < len; i++) {
            hashCollector = abi.encodePacked(hashCollector, bytes(lsMemory[proposeToMemories[_index][i]]), ";");//byte(0)
        }
        _hashInfo = string(hashCollector);
    }

    // ****** Like ****** 
    function sentLike(uint _index) public {
        //Add address liker to map
        mpLike[_index].push(msg.sender);
        emit NewLike(msg.sender);
    }

    // Get like form mpLike.
    // function getLike(uint _index) public view returns(address[] memory addLike) {
    //     //Add address liker to map
    //     addLike = mpLike[_index];
    // }

    // ****** Comment ****** 
    function addComment(uint _index, string memory _commentHash) public {
        require(_index < lsMemory.length, "Invalid index memory. ");
        uint id = lsComment.push(_commentHash) - 1;
        memoryToComments[_index].push(id);
        emit NewComment(_index, _commentHash);
    }

    //
    function getAllComment(uint _index) public view returns (string memory commentHash) {
        uint len = memoryToComments[_index].length;
        bytes memory hashCollect;
        for (uint i = 0; i < len; i++) {
            hashCollect = abi.encodePacked(hashCollect, bytes(lsComment[memoryToComments[_index][i]]), ";");//byte(0)
        }
        commentHash = string(hashCollect);
    }

    // ****** Memory ****** 
    function doAddMemory(address _sender, uint _index, string memory _hashInfo) private {
        require(lovePropose.isOwnerPropose(_sender, _index), "Sender must be owner propose!");
        uint id = lsMemory.push(_hashInfo) - 1;
        proposeToMemories[_index].push(id); 
        emit NewMemory(id, _index, _hashInfo);
    }
}