if (process.env.NEXT_PUBLIC_COMETH_API_KEY === undefined)
    throw new Error('NEXT_PUBLIC_COMETH_API_KEY is undefined');
export const comethApiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY;

if (process.env.NEXT_PUBLIC_4337_BUNDLER_URL === undefined)
    throw new Error('NEXT_PUBLIC_4337_BUNDLER_URL is undefined');
export const bundlerUrl = process.env.NEXT_PUBLIC_4337_BUNDLER_URL;

if (process.env.NEXT_PUBLIC_PAYMASTER_URL === undefined)
    throw new Error('NEXT_PUBLIC_PAYMASTER_URL is undefined');
export const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;

if (process.env.NEXT_PUBLIC_RPC_URL === undefined)
    throw new Error('NEXT_PUBLIC_RPC_URL is undefined');
export const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;