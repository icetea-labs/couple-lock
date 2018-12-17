pragma solidity ^0.4.24;

contract User {
    struct UserLogin{
        address userAddr;
        string userName;
    }
    mapping(address => UserLogin) public userList;
    string [] public userList;

    // Register with User
    function registerUser( ) {

    }

    // Check Register User
    function isUserAddrValid(address _userAddr) {
        return         
    }

    // 
}