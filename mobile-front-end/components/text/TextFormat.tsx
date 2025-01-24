export function shortenAddress(longAddress: string) {
    const beg = longAddress.substring(0, 7);
    const end = longAddress.substring(longAddress.length - 5);

    return `${beg}...${end}`;
}