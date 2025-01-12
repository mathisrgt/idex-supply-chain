import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { polygonScanApiKey, privateKey } from "./environment/key";
import { holeskyRpcUrl, polygonAmoyRpcUrl } from "./environment/rpc";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    holesky: {
      url: holeskyRpcUrl,
      accounts: [privateKey],
    },
    polygon_amoy: {
      url: polygonAmoyRpcUrl,
      accounts: [privateKey],
    },
    berachainBartio: {
      url: process.env.BERACHAIN_BARTIO_RPC_URL,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: polygonScanApiKey,
      berachainBartio: "berachainBartio",
    },
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com"
        },
      },
      {
        network: "berachainBartio",
        chainId: 80084,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/80084/etherscan",
          browserURL: "https://bartio.beratrail.io/"
        },
      },
    ],
  },
};

export default config;
