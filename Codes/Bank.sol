// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    address public owner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this");
        _;
    }

    function mintMoney(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        balances[msg.sender] += amount;
    }

    function withdrawMoney(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
    }
    
    function transferFunds(address payable receipentAddress,uint _amount) public onlyOwner{
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
       balances[receipentAddress] += _amount;
    }

    function checkBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
}

 
