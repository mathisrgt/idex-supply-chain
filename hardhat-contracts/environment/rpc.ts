import * as dotenv from "dotenv";

dotenv.config();

if (process.env.HOLESKY_RPC_URL === undefined)
    throw new Error('HOLESKY_RPC_URL is undefined');
export const holeskyRpcUrl = process.env.HOLESKY_RPC_URL;

if (process.env.POLYGON_AMOY_RPC_URL === undefined)
    throw new Error('POLYGON_AMOY_RPC_URL is undefined');
export const polygonAmoyRpcUrl = process.env.POLYGON_AMOY_RPC_URL;