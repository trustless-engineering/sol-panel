import type { KubernetesObject } from '@kubernetes/client-node';
import type { Producer } from '@prisma/client';
import { buildProducerConfigMap, buildProducerDeployment } from 'models/producers/build';
import { applyToCluster } from 'utils/kubernetes/applyToCluster';

export async function startProducer(producer: Producer): Promise<KubernetesObject[]> {
	const deployment = buildProducerDeployment(producer);
	const configmap = buildProducerConfigMap(producer);

	const result = await applyToCluster(configmap, deployment);
	return result;
}
