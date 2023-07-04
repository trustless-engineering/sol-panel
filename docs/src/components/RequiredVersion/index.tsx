import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function RequiredVersion({ component }: { component: string }) {
	const { siteConfig } = useDocusaurusContext();
	const { customFields } = siteConfig;

	if (customFields.requiredVersion === undefined) {
		throw new Error('Required version is not defined in siteConfig.customFields');
	}

	const requiredVersion = customFields.requiredVersion[component];

	return requiredVersion;
}
