pragma solidity >=0.5;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract UserList is Ownable {
    struct User {
        bytes32 nick;
        bytes32 infoHash;
    }

    address public jobAddress;

    mapping (address => User) public addrToUser;
    mapping (bytes32 => address) public nickToAddr;
    
    // mapping (address => address[]) followList;
    function setJobAddress(address _jobAddr) public onlyOwner {
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

    function register(bytes32 _nick, bytes32 _infoHash) public {
        require(_nick != 0 && !isAddrRegistered(msg.sender) && !isNickRegistered(_nick), "Invalid register argument");
        addrToUser[msg.sender] = User(_nick, _infoHash);
        nickToAddr[_nick] = msg.sender;
    }

    function uploadUser(address[] memory _userAddress, bytes32[] memory _nick, bytes32[] memory _infoHash) public {
        require(isJobAddr(msg.sender), "Invalid Job Address");
        require(_userAddress.length == _nick.length && _userAddress.length == _infoHash.length, "Invalid length of [userAddress nick infoHash] not equal");
        uint len = _userAddress.length;
        for (uint i = 0; i < len; i++) {
            require(_nick[i] != 0 && !isAddrRegistered(_userAddress[i]) && !isNickRegistered(_nick[i]), "Invalid upload argument");
            addrToUser[_userAddress[i]] = User(_nick[i], _infoHash[i]);
            nickToAddr[_nick[i]] = _userAddress[i];
        }
    }

    function getUserByNick(bytes32 _nick) public view returns(address who, bytes32 infoHash) {
        who = nickToAddr[_nick];
        infoHash = addrToUser[who].infoHash;
    }

    function getUserByAddr(address who) public view returns(bytes32 nick, bytes32 infoHash) {
        User storage user = addrToUser[who];
        return (user.nick, user.infoHash);
    }
}
