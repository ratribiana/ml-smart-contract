const { ethers } = require("hardhat")
const hre = require("hardhat")

const TokenLockup = "MLTokenLockup"

async function main() {
  // Deploy TokenLockup contract with the following parameters
  const token = "0x4eaF47802d13426313D7f5CE89B06C52049871D5"
  const startTime = Math.floor(Date.now() / 1000) + 600 // Set start time to 10 minutes from now
  const claimDelay = 60 // Set claim delay to 1 minute
  const schedule = [
    { endTime: startTime + 300, portion: 50 }, // 50% unlock after 5 mins
    { endTime: startTime + 600, portion: 50 }, // 50% unlock after 10 mins
  ]

  const [deployer] = await ethers.getSigners()

  console.log("Deploying contracts using the account: " + deployer.address)

  const lockUpContract = await hre.ethers.getContractFactory(TokenLockup)
  const mlLockUpContract = await lockUpContract.deploy(
    token,
    startTime,
    claimDelay,
    schedule
  )
  await mlLockUpContract.deployed()

  console.log(
    "TokenLockup contract deployed at address:",
    mlLockUpContract.address
  )
}

// We recommend thxs pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
