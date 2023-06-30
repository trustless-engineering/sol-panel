import Link from "next/link";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="footer footer-center rounded p-10 text-base-content">
      <div className="grid grid-flow-col gap-4">
        <Link className="link-hover link" href="https://solpanel.io">
          About SOL Panel
        </Link>
        <Link className="link-hover link" href="https://github.com/trustless-engineering/sol-panel">
          Github
        </Link>
      </div>
      <div>
        <p>©{new Date().getFullYear()} Trustless Engineering Project</p>
        <small>
          <code>v1.0.0-next.63</code>
        </small>
      </div>
    </footer>
  );
}
