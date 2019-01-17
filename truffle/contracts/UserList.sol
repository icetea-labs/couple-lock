pragma solidity >=0.5;


contract UserList {
    struct User {
        bytes32 nick;
        string infoHash;
    }

    address admin;
    address jobAddress;

    mapping (address => User) public addrToUser;
    mapping (bytes32 => address) public nickToAddr;
    
    mapping (address => address[]) followList;

    constructor() public {
        admin = msg.sender;
    }

    function setJobAddress(address _jobAddr) public {
        require(msg.sender == admin, "Invalid admin address");
        jobAddress = _jobAddr;
    }

    function isJobAddr(address _jobAddr) public view returns(bool) {
        return jobAddress == _jobAddr;
    }

    function isAddrRegistered(address _who) public view returns(bool) {
        return addrToUser[_who].nick != 0;
    }

    function isNickRegistered(bytes32 _nick) public view returns(bool) {
        return nickToAddr[_nick] != address(0);
    }

    function couldRegister(address _who, bytes32 _nick) public view returns(bool, bool) {
        return (!isAddrRegistered(_who), !isNickRegistered(_nick));
    }

    function register(bytes32 _nick, string memory _infoHash) public {
        require(_nick != 0 && !isAddrRegistered(msg.sender) && !isNickRegistered(_nick), "Invalid register argument");
        addrToUser[msg.sender] = User(_nick, _infoHash);
        nickToAddr[_nick] = msg.sender;
    }

    function uploadUser(address _userAddress, bytes32 _nick, string memory _infoHash) public {
        require(_nick != 0 && !isAddrRegistered(_userAddress) && !isNickRegistered(_nick), "Invalid upload argument");
        require(isJobAddr(msg.sender), "Invalid Job Address");
        addrToUser[_userAddress] = User(_nick, _infoHash);
        nickToAddr[_nick] = _userAddress;
    }

    function getUserByNick(bytes32 _nick) public view returns(address who, string memory infoHash) {
        who = nickToAddr[_nick];
        infoHash = addrToUser[who].infoHash;
    }

    function getUserByAddr(address who) public view returns(bytes32 nick, string memory infoHash) {
        User storage user = addrToUser[who];
        return (user.nick, user.infoHash);
    }
}
