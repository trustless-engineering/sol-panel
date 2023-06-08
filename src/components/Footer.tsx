import Link from "next/link";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="footer footer-center rounded bg-base-200 p-10 text-base-content">
      <div className="grid grid-flow-col gap-4">
        <Link className="link-hover link" href="/about">
          About SOL Panel
        </Link>
        <Link className="link-hover link" href="https://github.com/trustless-engineering/sol-panel">
          Github
        </Link>
      </div>
      <div>
        <p>©{new Date().getFullYear()} Trustless Engineering Project</p>
        <small>
          <code>0.0.0-bleeding.1</code>
        </small>
      </div>
    </footer>
  );
}
