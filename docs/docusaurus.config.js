// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = {
	title: 'SOL Panel',
	tagline: 'Open source Solana data pipeline platform',
	trailingSlash: false,
	favicon: 'img/favicon.ico',
	url: 'https://docs.solpanel.io',
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
		},
	},
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
			appId: 'JV4GGZ8R9C',
			apiKey: 'bf3178766726891779cd67820b5b1fa5',
			indexName: 'solpanel_docs',
			contextualSearch: true,
			searchParameters: {},
			searchPagePath: 'search',
		},
		docs: {
			sidebar: {
				autoCollapseCategories: false,
			},
		},
		image: 'img/solpanel-social-card.png',
		navbar: {
			title: 'SOL Panel',
			logo: {
				alt: 'SOL Panel Logo',
				src: 'img/logo.svg',
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
					label: 'Github',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
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
							label: 'Stack Overflow',
							href: 'https://stackoverflow.com/questions/tagged/sol-panel',
						},
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
