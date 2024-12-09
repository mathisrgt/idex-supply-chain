export default function PageTitle({ text }: { text: string }) {
    return (<h1 className="text-2xl font-bold">{text}</h1>);
}

export function PageSecondaryTitle({ text }: { text: string }) {
    return (<h2 className="text-md font-semibold">{text}</h2>);
}