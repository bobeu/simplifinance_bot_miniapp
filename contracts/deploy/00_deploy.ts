import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { config as dotconfig } from "dotenv";

dotconfig();
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
	const {deploy,} = deployments;
	const {deployer, agent} = await getNamedAccounts();

  console.log("Agent add", agent);
/**
 * Deploy Test Token contract
 */
  const token = await deploy("TestUSD", {
    from: deployer,
    args: [],
    log: true,
  });
  console.log(`Token deployed to: ${token.address}`);

  /**
 * Deploy Simplifi contract
 */
  const contract = await deploy("Simplifi", {
    from: deployer,
    args: [deployer, agent, token.address],
    log: true,
  });
  console.log(`Simplifi deployed to: ${contract.address}`);
};

export default func;

func.tags = ["Token", "Simplifi"];
