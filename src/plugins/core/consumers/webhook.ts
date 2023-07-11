import { streamConsumerGroup } from 'utils/redis/streamConsumerGroup';
import { PrismaClient, type Consumer } from '@prisma/client';
import { type SetupOptions } from 'plugins/types';

interface WebhookSetupOptions extends SetupOptions {
	url: string;
}

let consumer: Consumer;
let options: WebhookSetupOptions;

async function setup(opts: WebhookSetupOptions) {
	const { consumerId } = (options = opts);
	const prisma = new PrismaClient();
	consumer = await prisma.consumer.findFirstOrThrow({
		where: {
			id: consumerId,
		},
	});
}

async function consume() {
	const streamName = `webhooks:${consumer.id}`;
	const currentId = '0';

	await streamConsumerGroup({
		streamName,
		groupName: options.groupName,
		consumerName: options.consumerName,
		startId: currentId,
		onMessage: async (message) => {
			const response = await fetch(options.url, {
				method: 'POST',
				body: JSON.stringify(message),
			});

			if (response.ok) {
				return true;
			}

			return false;
		},
	});
}

export { consume, setup };
