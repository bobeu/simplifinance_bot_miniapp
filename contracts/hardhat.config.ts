import type { HardhatUserConfig } from "hardhat/config";
import { config as dotconfig } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomiclabs/hardhat-web3";
import "@nomicfoundation/hardhat-viem";
import { zeroAddress } from "viem";

dotconfig();
const PRIVATE_KEY = process.env.PRIVATE_KEY_0xD7c;
// const AGENT_KEY = process.env.AGENT_KEY;
const AGENT_ADDRESS = process.env.AGENT_ADDRESS;

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [`${PRIVATE_KEY}`],
      chainId: 44787,
    },
    blaze: {
      url: "https://rpc.blaze.soniclabs.com",
      accounts: [`${PRIVATE_KEY}`],
      chainId: 57054,
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
      44787: `privatekey://${PRIVATE_KEY}`,
      57054: `privatekey://${PRIVATE_KEY}`,
    },
    oracle: {
      default: zeroAddress,
      44787: zeroAddress,
      57054: zeroAddress
      // 44787: '0x022F9dCC73C5Fb43F2b4eF2EF9ad3eDD1D853946'  // Chainlink oracle on Celo alfajores
    },
    agent: {
      default: AGENT_ADDRESS!,
      44787: AGENT_ADDRESS!,
      57054: AGENT_ADDRESS!
    },

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
