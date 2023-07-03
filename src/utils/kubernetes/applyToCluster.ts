import * as k8s from '@kubernetes/client-node';
export const applyToCluster = async (...specs: k8s.KubernetesObject[]) => {
	const kc = new k8s.KubeConfig();
	kc.loadFromDefault();

	const client = k8s.KubernetesObjectApi.makeApiClient(kc);

	const validSpecs = specs.filter((s) => s?.kind && s.metadata);
	const created: k8s.KubernetesObject[] = [];

	for (const spec of validSpecs) {
		spec.metadata = spec.metadata ?? {};
		spec.metadata.annotations = spec.metadata.annotations ?? {};

		delete spec.metadata.annotations['kubectl.kubernetes.io/last-applied-configuration'];
		spec.metadata.annotations['kubectl.kubernetes.io/last-applied-configuration'] = JSON.stringify(spec);

		try {
			await client.read(spec as any);
			const response = await client.patch(spec);

			created.push(response.body);
		} catch (e) {
			// we did not get the resource, so it does not exist, so create it
			const response = await client.create(spec);

			created.push(response.body);
		}
	}

	return created;
};
