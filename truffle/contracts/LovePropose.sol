pragma solidity >=0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IUserList {
    function isAddrRegistered(address _who) external view returns(bool);
    function isNickRegistered(bytes32 _nick) external view returns(bool);
}


contract LovePropose is Ownable {
    
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
        uint longitude;//Convert to big number
        uint latitude;//Convert to big number
        //bool  isPrivate;
    }

    struct Comment {
        address who;
        string  what;
        string  image;
    }

    Propose[] public lsPropose;
    Comment[] public lsComment;
    //constant
    string public emptyStr = "";
    //Map Propose: User -> Array Propose
    mapping (address => uint[]) public mpProposeOwner;
    event NewPropose(uint index, address indexed fAddress, string fPropose, string fImg, address indexed tAddress, bytes32 place, uint long, uint lat);
    event ReplyPropose(uint index, string tPropose, string tImg);
    //Map like: Propose ID -> Array liker 
    mapping (uint => address[]) public mpLike;
    event NewLike(address indexed fAddress);
    // Map comment: Propose ID -> Array comment 
    mapping (uint => uint[]) public mpComment;
    event NewComment(uint index, address indexed fAddress, string comment, string image);
    
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

    function isOwnerPropose(address _who, uint _index) public view returns(bool) {
        return (_who == lsPropose[_index].fAddress || _who == lsPropose[_index].tAddress);
    }

    // Send Propose.
    function sentPropose(string memory _fImage, string memory _fPropose, address _tAddress, bytes32 _place, uint _long, uint _lat) public onlyRegiter {
        require(msg.sender != _tAddress, "From address must be different with to address!");

        //Create new pending
        Propose memory newPro = Propose(msg.sender, _fPropose, _fImage, _tAddress, emptyStr, emptyStr, emptyStr, _place, _long, _lat);
        uint id = lsPropose.push(newPro) - 1;
        //Add ID mapping
        mpProposeOwner[msg.sender].push(id);
        mpProposeOwner[_tAddress].push(id);

        //Rase event new pedding request.
        emit NewPropose(id, msg.sender, _fPropose, _fImage, _tAddress, _place, _long, _lat);
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
        emit ReplyPropose(_index, _tPropose, _tImage);
    }

    //
    function getAllPropose() public view returns(address[] memory fListAddr, string memory fPropose, address[] memory tListAddr, string memory tPropose, bytes32[] memory place, uint[] memory long, uint[] memory lat) {
        uint len = lsPropose.length;
        bytes memory formCollector;
        bytes memory toCollector;
        tListAddr = new address[](len);
        fListAddr = new address[](len);
        place = new bytes32[](len);
        long = new uint[](len);
        lat = new uint[](len);
        
        for (uint i = 0; i < len; i++) {
            tListAddr[i] = lsPropose[i].tAddress;
            fListAddr[i] = lsPropose[i].fAddress;
            formCollector = abi.encodePacked(formCollector, lsPropose[i].fPropose, ";");//byte(0)
            toCollector = abi.encodePacked(toCollector, lsPropose[i].tPropose, ";");//byte(0)
            place[i] = lsPropose[i].place;
            long[i] = lsPropose[i].longitude;
            lat[i] = lsPropose[i].latitude;
        }
        fPropose = string(formCollector);
        tPropose = string(toCollector);
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
        bytes memory hashCollector;
        for (uint i = 0; i < len; i++) {
            who[i] = lsComment[mpComment[_index][i]].who;
            whatCollector = abi.encodePacked(whatCollector, bytes(lsComment[mpComment[_index][i]].what), ";");//byte(0)
            hashCollector = abi.encodePacked(hashCollector, bytes(lsComment[mpComment[_index][i]].image), ";");//byte(0)
        }
        what = string(whatCollector);
        imageHash = string(hashCollector);
    }

    //
    function setCoverImage(uint _index, string memory _imageHash) public {
      // Get approve
      // TODO..
      //Confirm Confirm address must be owner response Propose!
        require(isOwnerPropose(msg.sender, _index), "Sender must be owner propose!");
        lsPropose[_index].coverImg = _imageHash;
        //lsPropose[_index].coverImg = mpImage[indexImage];
    }
}