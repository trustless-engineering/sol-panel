import { type V1ConfigMap, type V1Deployment } from '@kubernetes/client-node';
import { type Producer } from '@prisma/client';

export function buildProducerConfigMap(producer: Producer): V1ConfigMap {
	return {
		apiVersion: 'v1',
		kind: 'ConfigMap',
		metadata: {
			name: `producer-${producer.id}`,
			labels: {
				app: 'sol-panel',
				component: 'producer',
				id: producer.id,
			},
		},
		data: {
			'producer.json': JSON.stringify(producer.config),
		},
	};
}

export function buildProducerDeployment(producer: Producer): V1Deployment {
	return {
		apiVersion: 'apps/v1',
		kind: 'Deployment',
		metadata: {
			name: `producer-${producer.id}`,
			labels: {
				app: 'sol-panel',
				component: 'producer',
				id: producer.id,
			},
		},
		spec: {
			replicas: 1,
			selector: {
				matchLabels: {
					app: 'sol-panel',
					component: 'producer',
					id: producer.id,
				},
			},
			template: {
				metadata: {
					labels: {
						app: 'sol-panel',
						component: 'producer',
						id: producer.id,
					},
				},
				spec: {
					containers: [
						{
							name: 'producer',
							image: 'node:18.0.0-alpine3.14',
						},
					],
				},
			},
		},
	};
}
