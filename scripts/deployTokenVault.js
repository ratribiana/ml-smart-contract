require("@nomiclabs/hardhat-waffle")

const { ethers } = require("hardhat")
const hre = require("hardhat")

/*** This script will deploy all the contracts */
async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts using the account: " + deployer.address)

  // Deploy Life token operator
  const VAULT = await hre.ethers.getContractFactory("ManageLifeTokenTimeLock")
  const VAULT_CONTRACT = await VAULT.deploy(
    "0x04b3699F270237FC3E7813522d9C31283C5e2Ad8",
    "0x282093489Fa2db5e36c1894e808b789D624031BE",
    "1674217852"
  )
  await VAULT_CONTRACT.deployed()

  console.log("VAULT_CONTRACT has been deployed to: ", VAULT_CONTRACT.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
