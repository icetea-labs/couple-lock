pragma solidity >=0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IUserList {
    function isAddrRegistered(address _who) external view returns(bool);
    function isNickRegistered(bytes32 _nick) external view returns(bool);
}


contract LockLove is Ownable {
    
    IUserList public userList;
    
    struct Propose {
        address fAddress;
        string  fPropose;
        string  fImg;
        address tAddress;
        string  tPropose;
        string  tImg;
        string  coverImg;
        bytes32 place;
        bytes32 longitude;
        bytes32 latitude;
        //bool  isPrivate;
    }

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

    Propose[] public lsPropose;
    Memory[] public lsMemory;
    Comment[] public lsComment;
    //
    string public emptyStr = "";
    //Address -> Propose ID
    mapping (address => uint[]) public mpProposeOwner;
    //
    event NewPropose(address indexed fAddress, string fPropose, string fImg, address indexed tAddress, bytes32 place, bytes32 long, bytes32 lat);
    //
    event ReplyPropose(address indexed fAddress, string fPropose, string fImg, address indexed tAddress, string tPropose, string tImg);
    
    // ****** Extension ******
    //Map like address
    mapping (uint => address[]) public mpLike;
    event NewLike(address indexed fAddress);
    // For request: cover photo must be from memory.
    mapping (uint => string[]) public mpImage;
    event NewCoverImage(string fImg);
    // map Propose => memory ID
    mapping (uint => uint[]) public mpMemory;
    event NewMemory(uint index, address indexed fAddress, string comment, string image, bytes32 place, bytes32 long, bytes32 lat);
    // map Propose => comment ID
    mapping (uint => uint[]) public mpCommentMemory;
    mapping (uint => uint[]) public mpCommentPropose;
    event NewComment(uint typeComment, uint index, address indexed fAddress, string comment, string image);//typeComment: 0: lsPropose - 1: memory

    constructor (IUserList _userList) public {
        require(address(_userList) != address(0));
        userList = _userList;
    }

    modifier onlyRegiter {
        require(userList.isAddrRegistered(msg.sender));
        _;
    }

    function setUserList(IUserList _userList) public onlyOwner {
        userList = _userList;
    }

    // Send Propose.
    function sentPropose(string memory _fImage, string memory _fPropose, address _tAddress, bytes32 _place, bytes32 _long, bytes32 _lat) public onlyRegiter {
        require(msg.sender != _tAddress, "From address must be different with to address!");

        //Create new pending
        Propose memory newPro = Propose(msg.sender, _fPropose, _fImage, _tAddress, emptyStr, emptyStr, emptyStr, _place, _long, _lat);
        uint id = lsPropose.push(newPro) - 1;
        //Add ID mapping
        mpProposeOwner[msg.sender].push(id);
        mpProposeOwner[_tAddress].push(id);

        //Rase event new pedding request.
        emit NewPropose(msg.sender, _fPropose, _fImage, _tAddress, _place, _long, _lat);
    }

    // Reply Propose
    function replyPropose(uint _index, string memory _tPropose, string memory _tImage) public onlyRegiter {
        //Confirm Confirm address must be owner response Propose!
        require(msg.sender == lsPropose[_index].tAddress, "Confirm address must be owner!");
        // Check is update.
        bytes memory tempToPropose = bytes(lsPropose[_index].tPropose);
        require(tempToPropose.length == 0, "Propose can't update!");

        lsPropose[_index].tPropose = _tPropose;
        lsPropose[_index].tImg = _tImage;
        //Rase event new Propose
        emit ReplyPropose(msg.sender, lsPropose[_index].fPropose, lsPropose[_index].fImg, lsPropose[_index].tAddress, _tPropose, _tImage);
    }

    //
    function getAllPropose() public view returns(address[] fromList, string memory formPropose, address[] toList, string memory toPropose, bytes32[] place, bytes32[] long, bytes32[] lat) {
        uint len = lsPropose.length;
        bytes memory formCollector;
        bytes memory toCollector;
        toList = new address[](len);
        fromList = new address[](len);
        for (uint i = 0; i < len; i++) {
            toList[i] = lsPropose[i].tAddress;
            fromList[i] = lsPropose[i].fAddress;
            formCollector = abi.encodePacked(formCollector, lsPropose[i].fPropose, ";");//byte(0)
            toCollector = abi.encodePacked(toCollector, lsPropose[i].tPropose, ";");//byte(0)
            place[i] = lsPropose[i].place;
            long[i] = lsPropose[i].longitude;
            lat[i] = lsPropose[i].latitude;
        }
        formPropose = string(formCollector);
        toPropose = string(toCollector);
    }

    // Get Detail Propose(For wallpage)
    function getDetailPropose(uint index) public view returns(address fAddress, string memory fPropose, string memory fImg, address tAddress, string memory tPropose, string memory tImg, string memory coverImg) {
        // Can get form array lsPropose
        fAddress = lsPropose[index].fAddress;
        fPropose = lsPropose[index].fPropose;
        fImg = lsPropose[index].fImg;
        tAddress = lsPropose[index].tAddress;
        tPropose = lsPropose[index].tPropose;
        tImg = lsPropose[index].tImg;
        coverImg = lsPropose[index].coverImg;
    }

    // ****** Extension ******
    // ****** Like ****** 
    // Send like.
    function sentLike(uint _index, address _tAddress) public {
        //Add address liker to map
        mpLike[_index].push(_tAddress);
        emit NewLike(_tAddress);
    }

    // Send like pending.
    function getLike(uint _index) public view returns(address[] addLike, uint indexValue) {
        //Add address liker to map
        addLike = mpLike[_index];
        indexValue = _index;
    }

    // ****** Change cover image ****** 
    // Get list image in memory for change cover image.
    function getMemoryImage(uint _index) public view returns (string memory imageHash) {
        uint len = mpImage[_index].length;
        bytes memory hashCollector;
        for (uint i = 0; i < len; i++) {
            hashCollector = abi.encodePacked(hashCollector, bytes(mpImage[_index][i]), ";");//byte(0)
        }
        imageHash = string(hashCollector);
    }

    // Change cover image form Memory image.
    function setCoverImage(uint _index, string memory _imageHash) public {
      // Get approve
      // TODO..
      //Confirm Confirm address must be owner response Propose!
        require(msg.sender == lsPropose[_index].tAddress || msg.sender == lsPropose[_index].fAddress, "Address must be owner!");
        lsPropose[_index].coverImg = _imageHash;
        //lsPropose[_index].coverImg = mpImage[indexImage];
        emit NewCoverImage(_imageHash);
    }

    // ****** Memory ****** 
    function addMemory(uint _index, string memory _comment, string memory _image, bytes32 _place, bytes32 _long, bytes32 _lat) public {
        Memory memory newMemo = Memory(msg.sender, _comment, _image, _place, _long, _lat);
        uint id = lsMemory.push(newMemo) - 1;
        mpMemory[_index].push(id); 
        emit NewMemory(_index, msg.sender, _comment, _image, _place, _long, _lat);
    }

    function getMemory(uint _index) public view returns (address[] who, string what, string imageHash, bytes32[] place, bytes32[] long, bytes32[] lat) {
        uint len = mpMemory[_index].length;
        who = new address[](len);
        // place = new bytes32[](len);
        // long = new bytes32[](len);
        // lat = new bytes32[](len);

        bytes memory whatCollector;
        bytes memory hashCollector;
        for (uint i = 0; i < len; i++) {
            who[i] = lsMemory[mpMemory[_index][i]].who;
            whatCollector = abi.encodePacked(whatCollector, bytes(lsMemory[mpMemory[_index][i]].what), ";");//byte(0)
            hashCollector = abi.encodePacked(hashCollector, bytes(lsMemory[mpMemory[_index][i]].image), ";");//byte(0)
            place[i] = lsMemory[mpMemory[_index][i]].place;
            long[i] = lsMemory[mpMemory[_index][i]].longitude;
            lat[i] = lsMemory[mpMemory[_index][i]].latitude;
        }
        what = string(whatCollector);
        imageHash = string(hashCollector);
    }

    // ****** Comment ****** 
    function addComment(uint _type, uint _index, string memory _comment, string memory _image) public {
        uint id = lsComment.push(Comment(msg.sender, _comment, _image)) - 1;
        // Check comment for Propose(0) or Memory(1).
        if (_type == 0) {
            mpCommentPropose[_index].push(id);
        }else {
            mpCommentMemory[_index].push(id);
        }
        emit NewComment(_type, _index, msg.sender, _comment, _image);
    }
    
    function getCommentPropose(uint _index) public view returns (address[] who, string what, string imageHash) {
        uint len = mpCommentPropose[_index].length;
        who = new address[](len);
        bytes memory whatCollector;
        bytes memory hashCollector;
        for (uint i = 0; i < len; i++) {
            who[i] = lsComment[mpCommentPropose[_index][i]].who;
            whatCollector = abi.encodePacked(whatCollector, bytes(lsComment[mpCommentPropose[_index][i]].what), ";");//byte(0)
            hashCollector = abi.encodePacked(hashCollector, bytes(lsComment[mpCommentPropose[_index][i]].image), ";");//byte(0)
        }
        what = string(whatCollector);
        imageHash = string(hashCollector);
    }

    function getCommentMemory(uint _index) public view returns (address[] who, string what, string imageHash) {
        uint len = mpCommentMemory[_index].length;
        who = new address[](len);
        bytes memory whatCollector;
        bytes memory hashCollector;
        for (uint i = 0; i < len; i++) {
            who[i] = lsComment[mpCommentMemory[_index][i]].who;
            whatCollector = abi.encodePacked(whatCollector, bytes(lsComment[mpCommentMemory[_index][i]].what), ";");//byte(0)
            hashCollector = abi.encodePacked(hashCollector, bytes(lsComment[mpCommentMemory[_index][i]].image), ";");//byte(0)
        }
        what = string(whatCollector);
        imageHash = string(hashCollector);
    }
}