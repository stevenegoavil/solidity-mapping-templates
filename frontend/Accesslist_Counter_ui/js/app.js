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
      "name": "count",
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
      "name": "decrease",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCount",
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
      "name": "increase",
      "outputs": [],
      "stateMutability": "nonpayable",
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
    }
  ]
};

const abi = importCounterArtifact.abi;

let provider, signer, contract; 

const connectBtn = document.getElementById("connect"); 
const ownerBtn = document.getElementById("getOwner"); 
const incrementBtn = document.getElementById("increase");
const decrementBtn = document.getElementById("decrease");
const addUserBtn = document.getElementById("add-user");
const removeUserBtn = document.getElementById("remove-user");

getCount = async() => {
  if (!contract) return;
  const count = await contract.getCount();
  document.getElementById("count").innerText = count;
};

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
  getCount();
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



incrementBtn.onclick = async () => {
  if (!contract) return;
  const tx = await contract.increase();
  document.getElementById("status").innerText = "Transaction sent…";
  await tx.wait();
  getCount();
  document.getElementById("status").innerText = "Counter incremented!";
};

decrementBtn.onclick = async () => {
  if (!contract) return;
  const tx = await contract.decrease();
  document.getElementById("status").innerText = "Transaction sent…";
  await tx.wait();
  getCount();
  document.getElementById("status").innerText = "Counter decremented!";
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



function updateStatus(message, type = "info") {
  const statusDisplay = document.getElementById("status");
  statusDisplay.innerText = message;
  statusDisplay.className = `alert alert-${type}`;
  statusDisplay.style.display = "block";
}