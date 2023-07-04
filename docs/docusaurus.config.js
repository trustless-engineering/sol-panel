// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'SOL Panel',
	tagline: 'Solana data pipelines for everyone.',
	favicon: 'img/favicon.ico',
	url: 'https://docs.solpanel.io',
	baseUrl: '/',
	organizationName: 'trustless-engineering',
	projectName: 'sol-panel',
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
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/trustless-engineering/sol-panel/tree/main/docs/',
				},
				blog: {
					showReadingTime: true,
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			docs: {
				sidebar: {
					autoCollapseCategories: true,
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
						type: 'docSidebar',
						sidebarId: 'tutorialSidebar',
						position: 'left',
						label: 'Docs',
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
				copyright: `Copyright © ${new Date().getFullYear()} the Trustless Engineering Project.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
