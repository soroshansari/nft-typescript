import * as dotenv from "dotenv";

dotenv.config();

const Configs = {
  API_URL: process.env.RINKEBY_URL || "",
  PUBLIC_KEY: process.env.RINKEBY_PUBLIC_KEY || "",
  PRIVATE_KEY: process.env.RINKEBY_PRIVATE_KEY || "",
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || "",
  TRANSACTION_GAS: Number(process.env.TRANSACTION_GAS) || 500000,
  REPORT_GAS: Boolean(process.env.REPORT_GAS),
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
};

export default Configs;
