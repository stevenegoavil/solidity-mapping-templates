<<<<<<< HEAD
# solidity-mapping-template (2 templates)

This repo contains my Solidity and ethers.js practice projects as part of my Web3 developer journey. These templates focus on `mapping`, `msg.sender` control, and access management in smart contracts. The goal is to sharpen my ability to write reusable contract logic and deploy/test them on local blockchains.

### Contracts Included

# 1. TokenBank.sol
- Tracks approved addresses using `mapping(address => bool)`
- Includes `modifier onlyApproved` for function-level access control
- Functions:
  - `approveUser(address)`
  - `revokeUser(address)`
  - `increase()` (restricted to approved users)
  - `getCount()`

# 2. AccessList.sol
- Simulates a basic ETH bank using `mapping(address => uint)`
- Allows users to deposit and withdraw ETH
- Functions:
  - `deposit()` (payable)
  - `withdraw(uint)`
  - `getBalance()`

###  Tools Used
- Solidity ^0.8.x
- Hardhat
- Ethers.js
- JavaScript (for deployment and interaction scripts)

###  Coming Soon
- Frontend UIs for both contracts (Vanilla JS + MetaMask or React + Ethers.js)
- test.js files to verify contract behavior
- A frontend-accessible "Smart Wallet" dApp

---

## Open to Work

I'm currently open to:
- Entry-level freelance smart contract work
- Solidity-based bug bounties
- Contributing to early-stage Web3 products (especially DeFi tools)

**Focus Areas:**  
DeFi scripting, access control, smart contract patterns, and EVM-based interactions.

Feel free to reach out if you're looking for help building or testing small contracts and interaction scripts.
=======
# solidity-mapping-templates
>>>>>>> 9dcc1bb (Initial commit)
