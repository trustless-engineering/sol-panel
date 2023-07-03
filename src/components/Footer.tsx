import { type Route } from 'next';
import Link from 'next/link';

export default async function Footer() {
	const version = process.env.VERSION ?? 'v0.0.0-bleeding.0';

	return (
		<footer className='footer footer-center rounded p-10 text-base-content'>
			<div className='grid grid-flow-col gap-4'>
				<Link className='link-hover link' href={'https://solpanel.io' as Route}>
					About SOL Panel
				</Link>
				<Link className='link-hover link' href={'https://github.com/trustless-engineering/sol-panel' as Route}>
					Github
				</Link>
			</div>
			<div>
				<p>©{new Date().getFullYear()} Trustless Engineering Project</p>
				<small>
					<code>{version}</code>
				</small>
			</div>
		</footer>
	);
}
