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
        string proposeHash;
    }

    Propose[] public lsPropose;
    string[] public lsComment;
    //Map Propose: User -> Array Propose
    mapping (address => uint[]) public userToPropose;
    event NewPropose(uint index, address sender, address receiver, string proposeHash);
    event ReplyPropose(uint index, string proposeHash);

    // Map comment: Propose ID -> Array comment 
    mapping (uint => uint[]) public proposeToComment;
    event NewComment(uint index, string commentHash);

    //Map like: Propose ID -> Array liker 
    mapping (uint => address[]) public mpLike;
    event NewLike(address sender);

    
    constructor (IUserList _userList) public {
        require(address(_userList) != address(0));
        userList = _userList;
    }

    modifier onlyRegiter {
        require(userList.isAddrRegistered(msg.sender));
        _;
    }

    modifier onlyJob {
        require(userList.isJobAddr(msg.sender));
        _;
    }

    function setUserList(IUserList _userList) public onlyOwner {
        userList = _userList;
    }

    function isOwnerPropose(address _who, uint _index) public view returns(bool) {
        return (_who == lsPropose[_index].sender || _who == lsPropose[_index].receiver);
    }

    // Send Propose.
    function sentPropose(address _receiver, string memory _proposeHash) public onlyRegiter {
        ///Do Sent Propose
        doSentPropose(msg.sender, _receiver, _proposeHash);
    }

    // Upload Propose.
    function uploadSentPropose(address _sender, address _receiver, string memory _proposeHash) public onlyJob {
        ///Do Sent Propose
        doSentPropose(_sender, _receiver, _proposeHash);
    }

    // Reply Propose
    function replyPropose(uint _index, string memory _proposeHash) public onlyRegiter {
        //Do Reply Propose
        doReplyPropose(_index, msg.sender, _proposeHash);
    }

    // Upload Reply Propose
    function uploadReplyPropose(uint _index, address _receiver, string memory _proposeHash) public onlyJob {
        //Do Reply Propose
        doReplyPropose(_index, _receiver, _proposeHash);
    }

    function getAllPropose() public view returns(address[] memory lsSender, address[] memory lsReceiver, string memory proposeHash) {
        uint len = lsPropose.length;
        bytes memory hashCollect;
        lsSender = new address[](len);
        lsReceiver = new address[](len);
        
        for (uint i = 0; i < len; i++) {
            lsSender[i] = lsPropose[i].sender;
            lsReceiver[i] = lsPropose[i].receiver;
            hashCollect = abi.encodePacked(hashCollect, bytes(lsPropose[i].proposeHash), ";");//byte(0)
        }
        proposeHash = string(hashCollect);
    }

    // ****** Like ****** 
    function sentLike(uint _index) public {
        //Add address liker to map
        mpLike[_index].push(msg.sender);
        emit NewLike(msg.sender);
    }

    // ****** Comment ****** 
    function addComment(uint _index, string memory _commentHash) public {
        require(_index < lsPropose.length, "Invalid index propose.");
        uint id = lsComment.push(_commentHash) - 1;
        proposeToComment[_index].push(id);
        emit NewComment(_index, _commentHash);
    }

    //
    function getAllComment(uint _index) public view returns (string memory commentHash) {
        uint len = proposeToComment[_index].length;
        bytes memory hashCollect;
        for (uint i = 0; i < len; i++) {
            hashCollect = abi.encodePacked(hashCollect, bytes(lsComment[proposeToComment[_index][i]]), ";");//byte(0)
        }
        commentHash = string(hashCollect);
    }

    
    // function setCoverImage(uint _index, string memory _imageHash) public {
    //   // Get approve
    //   // TODO..
    //   // Confirm Confirm address must be owner response Propose!
    //     require(isOwnerPropose(msg.sender, _index), "Sender must be owner propose!");
    //     lsPropose[_index].coverImg = _imageHash;
    //     lsPropose[_index].coverImg = mpImage[indexImage];
    // }

    // Do Send Propose.
    function doSentPropose(address _sender, address _receiver, string memory _proposeHash) private {
        require(_sender != _receiver, "Sender must be different with receiver address!");

        //Create new pending
        Propose memory newPro = Propose(_sender, _receiver, _proposeHash);
        uint id = lsPropose.push(newPro) - 1;
        //Add ID mapping
        userToPropose[_sender].push(id);
        userToPropose[_receiver].push(id);

        //Rase event new pedding request.
        emit NewPropose(id, _sender, _receiver, _proposeHash);
    }

    // Do Reply Propose
    function doReplyPropose(uint _index, address _receiver, string memory _proposeHash) private {
        //Confirm Confirm address must be owner response Propose!
        require(_receiver == lsPropose[_index].receiver, "Receiver address must be owner-propose!");

        lsPropose[_index].proposeHash = _proposeHash;
        //Rase event new Propose
        emit ReplyPropose(_index, _proposeHash);
    }
}