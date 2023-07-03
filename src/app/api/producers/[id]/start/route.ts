import { applyToCluster } from 'utils/kubernetes/applyToCluster';
import { buildProducerDeployment } from './buildProducerDeployment';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const deployment = await buildProducerDeployment(params.id);
	const result = await applyToCluster(deployment);

	return new Response(JSON.stringify(result), {
		headers: { 'content-type': 'application/json' },
	});
}
