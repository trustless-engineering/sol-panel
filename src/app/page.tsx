import Link from "next/link";

export default function Home(): React.JSX.Element {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-full">
          <h1 className="text-5xl font-bold">SOL Panel</h1>
          <p className="py-6">
            SOL Panel is a composability platform for Solana. With official and community plugins you can create your own dedicated Solana API infrastructure in
            a just a few clicks!
          </p>
          <Link className="btn-primary btn" href="/setup">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
