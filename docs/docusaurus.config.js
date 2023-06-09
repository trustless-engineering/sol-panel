// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/shadesOfPurple');
const darkCodeTheme = require('prism-react-renderer/themes/synthwave84');

const config = {
	title: 'SOL Panel',
	tagline: 'Open source Solana data pipeline platform',
	trailingSlash: true,
	favicon: 'img/favicon.ico',
	url: 'https://solpanel.io',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'throw',
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},
	customFields: {
		requiredVersion: {
			kubernetes: '1.26',
			tilt: '0.33',
			node: '20.2.0',
		},
	},
	markdown: {
		mermaid: true,
	},
	themes: ['@docusaurus/theme-mermaid'],
	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/trustless-engineering/sol-panel/tree/next/docs/',
				},
				blog: {
					showReadingTime: true,
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
	themeConfig: {
		algolia: {
			appId: 'R0QX7KZ4K2',
			apiKey: 'bcf8874ce4c700d259f9106d87ecf64d',
			indexName: 'solpanel',
			contextualSearch: true,
			searchParameters: {},
			searchPagePath: 'search',
		},

		colorMode: {
			respectPrefersColorScheme: false,
		},
		docs: {
			sidebar: {
				autoCollapseCategories: false,
			},
		},
		image: 'img/solpanel-social-card.png',
		navbar: {
			style: 'primary',
			title: 'SOL Panel',
			logo: {
				alt: 'SOL Panel Logo',
				src: 'img/favicon-96x96.png',
			},
			items: [
				{
					to: 'docs/introduction/motivation',
					label: 'Docs',
					position: 'left',
				},
				{ to: '/blog', label: 'Blog', position: 'left' },
				{
					href: 'https://github.com/trustless-engineering/sol-panel',
					className: 'header-github-link',
					'aria-label': 'GitHub repository',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'light',
			logo: {
				alt: 'SOL Panel',
				src: 'img/favicon-96x96.png',
				href: 'https://solpanel.io/',
				width: 96,
				height: 96,
			},
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Quick Start',
							to: '/docs/installation/quick-start',
						},
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'Discord',
							href: 'https://discord.gg/ZtzNueuB',
						},
						{
							label: 'Twitter',
							href: 'https://twitter.com/trustlesseng',
						},
					],
				},
				{
					title: 'Sponsors',
					items: [
						{
							label: 'Latitude.sh',
							href: 'https://latitude.sh',
						},
					],
				},
				{
					title: 'More',
					items: [
						{
							label: 'Blog',
							to: '/blog',
						},
						{
							label: 'GitHub',
							href: 'https://github.com/trustless-engineering/sol-panel',
						},
					],
				},
			],
			copyright: `Copyright ©${new Date().getFullYear()} the Trustless Engineering Project.`,
		},
		prism: {
			theme: lightCodeTheme,
			darkTheme: darkCodeTheme,
		},
	},
};

module.exports = config;
