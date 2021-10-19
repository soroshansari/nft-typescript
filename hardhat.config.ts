import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import Configs from "./configs";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: Configs.API_URL,
      accounts: Configs.PRIVATE_KEY !== undefined ? [Configs.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: Configs.REPORT_GAS,
    currency: "USD",
  },
  etherscan: {
    apiKey: Configs.ETHERSCAN_API_KEY,
  },
};

export default config;
