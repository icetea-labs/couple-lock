pragma solidity >=0.4.24;

contract UserList {
    struct User {
        bytes32 nick;
        string avatarHash;
    }

    mapping (address => User) public addrToUser;
    mapping (bytes32 => address) public nickToAddr;
    
    mapping (address => address[]) followList;

    function isAddrRegistered(address _who) public view returns(bool) {
        return addrToUser[_who].nick != 0;
    }

    function isNickRegistered(bytes32 _nick) public view returns(bool) {
        return nickToAddr[_nick] != address(0);
    }

    function couldRegister(address _who, bytes32 _nick) public view returns(bool, bool) {
        return (!isAddrRegistered(_who), !isNickRegistered(_nick));
    }

    function register(bytes32 _nick, string memory _avatarHash)    public {
        require(_nick != 0 && !isAddrRegistered(msg.sender) && !isNickRegistered(_nick), "Invalid argument");
        addrToUser[msg.sender] = User(_nick, _avatarHash);
        nickToAddr[_nick] = msg.sender;
    }

    function getUserByNick(bytes32 _nick) public view returns(address who, string memory avatarHash) {
        who = nickToAddr[_nick];
        avatarHash = addrToUser[who].avatarHash;
    }

    function getUserByAddr(address who) public view returns(bytes32 nick, string memory avatarHash) {
        User storage user = addrToUser[who];
        return (user.nick, user.avatarHash);
    }

}
