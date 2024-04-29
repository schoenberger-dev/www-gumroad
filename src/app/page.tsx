import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-1 items-center justify-center min-h-screen bg-gradient-radial from-emerald-50/25 via-fuchsia-100/50 to-stone-50/75">
      <h1 className="font-headline font-semibold text-4xl">ars · ludica</h1>
      <div className="font-sans font-bold text-black/30">{'"the art of play"'}</div>
    </div>
  );
}