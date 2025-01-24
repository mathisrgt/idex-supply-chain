export function waitInSec(sec: number): Promise<void> {
    return wait(sec * 1000);
}

export function wait(ms: number): Promise<void> {
    console.log(`Wainting ${ms} ms...`);
    return new Promise((resolve) => setTimeout(resolve, ms));
}