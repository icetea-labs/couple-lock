pragma solidity >=0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IUserList {
    function isAddrRegistered(address _who) external view returns(bool);
    function isNickRegistered(bytes32 _nick) external view returns(bool);
}


interface ILovePropose {
    function isOwnerPropose(address _who, uint _index) external view returns(bool);
}


contract LoveMemory is Ownable {
    
    IUserList public userList;
    ILovePropose public lovePropose;

    struct Memory {
        address who;
        string what;
        string image;
        bytes32 place;
        bytes32 longitude;
        bytes32 latitude;
    }

    struct Comment {
        address who;
        string  what;
        string  image;
    }

    Memory[] public lsMemory;
    Comment[] public lsComment;
    //
    string public emptyStr = "";
    
    // Map memory: Propose ID -> Array Memory
    mapping (uint => uint[]) public mpProposeMemory;
    event NewMemory(uint index, address indexed fAddress, string comment, string image, bytes32 place, bytes32 long, bytes32 lat);
    //Map like: Memory ID -> Array liker 
    mapping (uint => address[]) public mpLike;
    event NewLike(address indexed fAddress);
    // Map comment: Memory ID -> Array comment 
    mapping (uint => uint[]) public mpComment;
    event NewComment(uint index, address indexed fAddress, string comment, string image);

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
    // ****** Memory ****** 
    function addMemory(uint _index, string memory _comment, string memory _image, bytes32 _place, bytes32 _long, bytes32 _lat) public onlyRegiter {
        require(isOwnerPropose(msg.sender, _index), "Sender must be owner propose!");
        Memory memory newMemo = Memory(msg.sender, _comment, _image, _place, _long, _lat);
        uint id = lsMemory.push(newMemo) - 1;
        mpProposeMemory[_index].push(id); 
        emit NewMemory(_index, msg.sender, _comment, _image, _place, _long, _lat);
    }

    function getAllMemory(uint _index) public view returns (address[] memory who, string memory what, string memory imageHash, bytes32[] memory place, bytes32[] memory long, bytes32[] memory lat) {
        uint len = mpProposeMemory[_index].length;
        who = new address[](len);
        place = new bytes32[](len);
        long = new bytes32[](len);
        lat = new bytes32[](len);

        bytes memory whatCollector;
        bytes memory hashCollector;
        for (uint i = 0; i < len; i++) {
            who[i] = lsMemory[mpProposeMemory[_index][i]].who;
            whatCollector = abi.encodePacked(whatCollector, bytes(lsMemory[mpProposeMemory[_index][i]].what), ";");//byte(0)
            hashCollector = abi.encodePacked(hashCollector, bytes(lsMemory[mpProposeMemory[_index][i]].image), ";");//byte(0)
            place[i] = lsMemory[mpProposeMemory[_index][i]].place;
            long[i] = lsMemory[mpProposeMemory[_index][i]].longitude;
            lat[i] = lsMemory[mpProposeMemory[_index][i]].latitude;
        }
        what = string(whatCollector);
        imageHash = string(hashCollector);
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
    function addComment(uint _index, string memory _comment, string memory _image) public {
        uint id = lsComment.push(Comment(msg.sender, _comment, _image)) - 1;
        // Check comment for Propose(0) or Memory(1).
        mpComment[_index].push(id);
        emit NewComment(_index, msg.sender, _comment, _image);
    }

    //
    function getAllComment(uint _index) public view returns (address[] memory who, string memory what, string memory imageHash) {
        uint len = mpComment[_index].length;
        who = new address[](len);
        bytes memory whatCollector;
        bytes memory imageHashCollector;
        for (uint i = 0; i < len; i++) {
            who[i] = lsComment[mpComment[_index][i]].who;
            whatCollector = abi.encodePacked(whatCollector, bytes(lsComment[mpComment[_index][i]].what), ";");//byte(0)
            imageHashCollector = abi.encodePacked(imageHashCollector, bytes(lsComment[mpComment[_index][i]].image), ";");//byte(0)
        }
        what = string(whatCollector);
        imageHash = string(imageHashCollector);
    }
}