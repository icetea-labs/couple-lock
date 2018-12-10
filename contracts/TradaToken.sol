pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract TradaToken is ERC20, ERC20Detailed{

    constructor() public ERC20Detailed("Trada Coupon","TDC",18) {
        _mint(msg.sender, 10000000000000000000000000);
    }

}