'use client';

import './globals.css';

import { GlobalContextProvider, useGlobalContext } from 'contexts/GlobalContext';

import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	const { theme } = useGlobalContext();

	return (
		<GlobalContextProvider>
			<html data-theme={theme}>
				<head>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<meta name='viewport' content='width=device-width, initial-scale=1 maximum-scale=1' />
				</head>
				<body>
					<Link href='/'>Foo</Link>
					<NavBar />
					<main className='container mx-auto'>{children}</main>
					<Footer />
				</body>
			</html>
		</GlobalContextProvider>
	);
}
