export default function Loading(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-self-stretch">
      <p className="prose-xl prose">Loading...</p>
      <span className="loading loading-infinity loading-lg text-xl"></span>
    </div>
  );
}
