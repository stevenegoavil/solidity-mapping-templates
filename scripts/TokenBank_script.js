const hre = require("hardhat");

let tokenbankTrigger = async () => {
    try{
        const tokenBank = await hre.ethers.getContractFactory("TokenBank");
        const tokenbank = await tokenBank.deploy();

        await tokenbank.deployed();

        console.log("TokenBank Solidity Contract deployed to: ", tokenbank.address);
    }
    catch(error){
        console.log(error, "Error ");
        process.exitCode = 1;
    }
}

tokenbankTrigger();