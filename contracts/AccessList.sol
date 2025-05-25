// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.8.0;

contract AccessList_Counter {
    uint public count;
    address public owner;

    mapping(address => bool) public approvedUsers;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyApproved() {
        require(approvedUsers[msg.sender] = true, "Not an approved user");
        _;
    }

    function approveUser(address _user) public {
        require(msg.sender == owner, "Only owner can approve users");
        approvedUsers[_user] = true;
    }

    function revokeUser(address _user) public {
        require(msg.sender == owner, "Only owner can revoke users");
        approvedUsers[_user] = false;
    }

    function increase() public onlyApproved {
        count += 1;
        // emit CountIncreased(msg.sender, count); // optional: add event here
    }

    function decrease() public onlyApproved {
        require(count >0, "count needs to be greater than zero");
        count -= 1;
    }

    function getCount() public view returns (uint) {
        return count;
    }
}
