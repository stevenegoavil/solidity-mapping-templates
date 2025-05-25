const hre = require("hardhat");

let accesslistTrigger = async () => {
    try {
        const accessList = await hre.ethers.getContractFactory("AccessList");
        const owner = await accessList.deploy();

        await owner.deployed();

        console.log("AccessList Solidity Contract deployed to:", owner.address);
    }
    catch(error){
        console.log(error, "Error ");
        process.exitCode = 1;
    }
}

accesslistTrigger();