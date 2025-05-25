//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.8.0;

contract TokenBank {
 
address public user; 
mapping(address=>uint) public track_balances; 

    constructor() {
        user = msg.sender; 
    }

    receive() external payable {}
    
    function deposit() public payable {
        track_balances[msg.sender] += msg.value;
    }
    function withdraw(uint _amount) public {
        require(track_balances[msg.sender] >= _amount, "Insufficient balance");
        track_balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() public view returns(uint) {
        return track_balances[msg.sender];
    }
}