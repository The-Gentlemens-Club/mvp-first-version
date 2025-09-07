const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying GentlemenClub contract to Sepolia testnet...");

  // Get the contract factory
  const GentlemenClub = await ethers.getContractFactory("GentlemenClub");

  // Deploy the contract
  const gentlemenClub = await GentlemenClub.deploy();

  // Wait for deployment to complete
  await gentlemenClub.deployed();

  console.log("GentlemenClub deployed to:", gentlemenClub.address);
  console.log("Transaction hash:", gentlemenClub.deployTransaction.hash);

  // Fund the contract with some ETH for the house bankroll
  const fundTx = await gentlemenClub.signer.sendTransaction({
    to: gentlemenClub.address,
    value: ethers.utils.parseEther("1.0") // 1 ETH
  });

  await fundTx.wait();
  console.log("Contract funded with 1 ETH for house bankroll");

  // Verify deployment
  const owner = await gentlemenClub.owner();
  const balance = await ethers.provider.getBalance(gentlemenClub.address);
  
  console.log("Contract owner:", owner);
  console.log("Contract balance:", ethers.utils.formatEther(balance), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
