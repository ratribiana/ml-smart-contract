require("@nomiclabs/hardhat-waffle")

const { ethers } = require("hardhat")
const hre = require("hardhat")

/*** This script will deploy all the contracts */
async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts using the account: " + deployer.address)

  // Deploy ML NFT
  const NFT = await hre.ethers.getContractFactory("ManageLife")
  const MLNFT = await NFT.deploy()
  await MLNFT.deployed()

  console.log("NFT has been deployed to: " + MLNFT.address)
}

// We recommend thxs pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
