/* eslint @typescript-eslint/no-var-requires: "off" */
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
	{
		title: 'Cloud Native by Design',
		Svg: require('@site/static/img/undraw_cloud_hosting.svg').default,
		description: <>SOL Panel is designed for the modern age. And can be installed in minutes on all major cloud platforms.</>,
	},
	{
		title: 'Open Source and Free',
		Svg: require('@site/static/img/undraw_open_source.svg').default,
		description: <>SOL Panel is licensed with the Apache 2.0 license to ensure that anyone can easily build and acccess data on Solana.</>,
	},
	{
		title: 'Community Plugins',
		Svg: require('@site/static/img/undraw_monitor.svg').default,
		description: <>Extend SOL Panel with community plugins that enable complex pipeline creation in just a few clicks.</>,
	},
];

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx('col col--4')}>
			<div className='text--center'>
				<Svg className={styles.featureSvg} role='img' />
			</div>
			<div className='text--center padding-horiz--md'>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className='container'>
				<div className='row'>
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
