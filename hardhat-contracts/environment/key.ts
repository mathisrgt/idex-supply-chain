import * as dotenv from "dotenv";

dotenv.config();

if (process.env.PRIVATE_KEY === undefined)
    throw new Error('PRIVATE_KEY is undefined');
export const privateKey = process.env.PRIVATE_KEY;

if (process.env.POLYGONSCAN_API_KEY === undefined)
    throw new Error('POLYGONSCAN_API_KEY is undefined');
export const polygonScanApiKey = process.env.POLYGONSCAN_API_KEY;
