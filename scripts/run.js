const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1")
  })
  await waveContract.deployed();

  console.log('Contract deployed to: ', waveContract.address);
  console.log('Contract deployed by: ', owner.address);

  let currentBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("Current balance: ", hre.ethers.utils.formatEther(currentBalance))

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("Wave #1");
  await waveTxn.wait();

  let waveTxn2 = await waveContract.wave("Wave #2");
  await waveTxn.wait();

  currentBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("Current balance: ", hre.ethers.utils.formatEther(currentBalance))

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave("Wave #3");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  const allWaves = await waveContract.getAllWaves()
  console.log(allWaves)
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();