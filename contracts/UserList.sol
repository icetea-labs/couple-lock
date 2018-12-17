pragma solidity ^0.4.24;

contract {

    public bool isValid = true;

    struct User{
        address addrUser;
        bool validUser;
        bytes32 nick;
        
    }

    mapping(address => User) public addrToUser;
    mapping(bytes32 => address) public nickToAddr;

    // Find User Name
    function findUserName(address _nick){
        if ( addrToUser[msg.sender].nick == _nick);

    }
    // Find Address By User Name

    function findAddrByUserName(bytes32 _nick) {
        findUserByAddr(nikcto)
    }
    // Find User by Address
    function findUserByAddr(address _addr) {
        if (checkValidUser(_addr)){
            return addrToUser[_addr].nick;
        } else {
            checkValid(false);
        }
    }
    // Check Valid User
    function checkValidUser(address _addr) private returns (bool){
        return addrToUser[_addr].validUser;
    }

    // Check Valid
    function checkValid(bool _isValid) public returns (bool) {
        return _isValid;
    }


}