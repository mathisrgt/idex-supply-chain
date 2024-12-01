import { ethers, run } from "hardhat";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const woodTracker = await ethers.deployContract("WoodTracker");

  await woodTracker.waitForDeployment();

  console.log(
    `WoodTracker deployed to ${woodTracker.target}`
  );

  await delay(10000);

  // Verify contract
  try {
    console.log("Verifying contract...");
    await run("verify:verify", {
      address: await woodTracker.getAddress(),
      constructorArguments: [],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
