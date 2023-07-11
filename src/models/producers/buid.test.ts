import type { V1ConfigMap, V1Deployment } from '@kubernetes/client-node';
import { buildProducerConfigMap, buildProducerDeployment } from 'models/producers/build';
import { describe, expectTypeOf, it } from 'vitest';

const producer = {
	id: 'clabc2342342',
	name: 'Test Producer',
	description: 'This is a test producer',
	config: {
		type: 'http',
		url: 'https://example.com',
		method: 'GET',
	},
} as any;

describe('buildProducerConfigMap', () => {
	const result = buildProducerConfigMap(producer);

	it('should return a valid configmap', () => {
		expectTypeOf(result).toEqualTypeOf<V1ConfigMap>();
	});
});

describe('buildProducerDeployment', () => {
	const result = buildProducerDeployment(producer);

	it('should return a valid deployment', () => {
		expectTypeOf(result).toEqualTypeOf<V1Deployment>();
	});
});
