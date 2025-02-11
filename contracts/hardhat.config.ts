import type { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox-viem";
import { config as dotconfig } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomiclabs/hardhat-web3";
import "@nomicfoundation/hardhat-viem";
import "hardhat-dependency-compiler";
import { zeroAddress } from "viem";

dotconfig();
const PRIVATE_KEY = process.env.PRIVATE_KEY_CROSS_0xD7c;
const API_KEY = process.env.ALCHEMY_API_KEY;

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [`${PRIVATE_KEY}`],
      chainId: 44787,
    }
  },
  dependencyCompiler: {
    paths: [
      "@safe-global/safe-contracts/contracts/proxies/SafeProxyFactory.sol",
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
      44787: `privatekey://${PRIVATE_KEY}`,
    },
    oracle: {
      default: zeroAddress,
      44787: zeroAddress
      // 44787: '0x022F9dCC73C5Fb43F2b4eF2EF9ad3eDD1D853946'  // Chainlink oracle on Celo alfajores
    }
  },

  solidity: {
    version: "0.8.24",
    settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 200,
      },
        // evmVersion: "constantinople"
        // evmVersion: "paris" // Used
    }
  },
};

export default config;
