import { streamConsumerGroup } from 'utils/redis/streamConsumerGroup';
import { PrismaClient, type Consumer } from '@prisma/client';
import { type SetupOptions } from 'plugins/types';

interface WebhookSetupOptions extends SetupOptions {
	url: string;
}

let consumer: Consumer;
let options: WebhookSetupOptions;

// TODO: This should actually pull from streams. We should lookup the stream and generate a new consumer group for it
//

const setup = async (opts: WebhookSetupOptions): Promise<void> => {
	const { consumerId } = (options = opts);
	const prisma = new PrismaClient();
	consumer = await prisma.consumer.findFirstOrThrow({
		where: {
			id: consumerId,
		},
	});
};

const consume = async (): Promise<void> => {
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
};

export { consume, setup };
