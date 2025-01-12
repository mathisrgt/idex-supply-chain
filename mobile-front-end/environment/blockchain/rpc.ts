if (process.env.NEXT_PUBLIC_RPC_URL === undefined)
    throw new Error('NEXT_PUBLIC_RPC_URL is undefined');
export const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;