// This file is a react component

import Link from 'next/link';

export default function NavBar(): React.JSX.Element {
	return (
		<div className='navbar bg-primary text-primary-content mb-2'>
			<div className='flex-1'>
				<Link href='/' className='btn-ghost btn text-xl normal-case'>
					Sol Panel
				</Link>
			</div>
			<div className='flex-none'>
				<ul className='menu menu-horizontal px-1'>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						<details>
							<summary>Settings</summary>
							<ul className='bg-base-100 p-2'>
								<li>
									<Link href='/streams'>Streams</Link>
								</li>
								<li>
									<Link href='/producers'>Producers</Link>
								</li>
							</ul>
						</details>
					</li>
					<li>
						<Link href='/setup'>Setup</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
