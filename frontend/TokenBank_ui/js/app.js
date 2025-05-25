const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";


const importCounterArtifact = {
"abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "approveUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "approvedUsers",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "revokeUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "track_balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
};

const abi = importCounterArtifact.abi;

let provider, signer, contract; 
const connectBtn = document.getElementById("connect"); 
const ownerBtn = document.getElementById("getOwner"); 
const addUserBtn = document.getElementById("add-user");
const removeUserBtn = document.getElementById("remove-user");

const balanceBtn = document.getElementById("balance");
const depositBtn = document.getElementById("deposit");
const withdrawalBtn = document.getElementById("withdrawal");


getBalance = async() => {
  if (!contract) return;

  try {
    const balance = await contract.getBalance();
    balanceBtn.innerText = ethers.utils.formatEther(balance) + " ETH";
  } catch (error) {
    updateStatus("Could not fetch balance.", "warning");
  }
}

connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask.");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  const address = await signer.getAddress();
  document.getElementById("walletAddress").innerText = `Connected: ${address}`;
  getBalance();
};

ownerBtn.onclick = async () => {
  if (!contract) return;

  try {
    const ownerAddress = await contract.owner();
    ownerDisplay.innerText = `Contract Owner: ${ownerAddress}`;
  } catch (error) {
    updateStatus(`Failed to fetch owner: ${error.message}`, "danger");
  }
};

addUserBtn.onclick = async () => {
  if (!contract) return;

  const addressInput = document.getElementById("user-address").value;
  if (!ethers.utils.isAddress(addressInput)) {
    updateStatus("Enter a valid Ethereum address", "warning");
    return;
  }

  try {
    const tx = await contract.approveUser(addressInput)
    updateStatus("Approving User...");
    await tx.wait();
    updateStatus(`User ${addressInput} approved!`);
    } catch (error){
    updateStatus(`Failed to approve ${error.message}`, "danger")
    };
}

removeUserBtn.onclick = async () => {
  if (!contract) return;

  const addressInput = document.getElementById("user-address").value;
  if (!ethers.utils.isAddress(addressInput)) {
    updateStatus("Enter a valid Ethereum address", "warning");
    return;
  }

  try {
    const tx = await contract.revokeUser(addressInput)
    updateStatus("Revoking User...");
    await tx.wait();
    updateStatus(`User ${addressInput} revoked!`);
    } catch (error){
    updateStatus(`Failed to revoke ${error.message}`, "danger")
    };
}

depositBtn.onclick = async () => {
  if (!contract) return;

  const ethInput = document.getElementById("ethAmount").value;
  if (!ethInput || isNaN(ethInput)) {
    updateStatus("Enter a valid amount", "warning");
    return;
  }

  try {
    const tx = await contract.deposit({
      value: ethers.utils.parseEther(ethInput)
    });
    updateStatus("Deposit sent, waiting for confirmation…");
    await tx.wait();
    getBalance();
    updateStatus("Deposit received ");
  } catch (error) {
    updateStatus(`Deposit failed: ${error.message}`, "danger");
  }
};

withdrawalBtn.onclick = async () => {
  if (!contract) return;

  const ethInput = document.getElementById("ethAmount").value;
  if (!ethInput || isNaN(ethInput)) {
    updateStatus("Enter a valid amount", "warning");
    return;
  }

  try {
    const tx = await contract.withdraw(ethers.utils.parseEther(ethInput));
    updateStatus("Withdrawal sent, waiting for confirmation…");
    await tx.wait();
    getBalance();
    updateStatus("Withdrawal complete");
  } catch (error) {
    updateStatus(`Withdrawal failed: ${error.message}`, "danger");
  }
};


function updateStatus(message, type = "info") {
  const statusDisplay = document.getElementById("status");
  statusDisplay.innerText = message;
  statusDisplay.className = `alert alert-${type}`;
  statusDisplay.style.display = "block";
}