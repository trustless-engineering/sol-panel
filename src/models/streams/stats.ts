import { withClient } from 'utils/redis';

export async function averageRate(streamId: string) {
	return await withClient(async (client) => {
		// Get the list of messages in the stream
		const messages = await client.xRange(streamId, '-', '+');

		// Get the list of timestamps from the messages
		const timestamps: Date[] = messages.map((message) => {
			const timestamp = message.id.split('-')[0];
			return new Date(parseInt(timestamp));
		});

		timestamps.sort((a, b) => a.getTime() - b.getTime());

		// Calculate the time duration between consecutive timestamps
		const timeDurations: number[] = [];
		for (let i = 1; i < timestamps.length; i++) {
			const duration = (timestamps[i].getTime() - timestamps[i - 1].getTime()) / 1000;
			timeDurations.push(duration);
		}

		// Calculate the total time duration and the number of messages
		const totalDuration = timeDurations.reduce((sum, duration) => sum + duration, 0);
		const totalMessages = timeDurations.length;

		// Calculate the average time per message
		const averageTimePerMessage = totalMessages > 0 ? totalDuration / totalMessages : 0;

		// Calculate the average rate of messages per second
		const averageRate = averageTimePerMessage > 0 ? 1 / averageTimePerMessage : 0;
		return averageRate;
	});
}

export async function getStreamLength(streamId: string) {
	return await withClient(async (client) => {
		const messages = await client.xRange(streamId, '-', '+');
		return messages.length;
	});
}

export async function getStreamRange(streamId: string, start: string, end: string) {
	return await withClient(async (client) => {
		const messages = await client.xRange(streamId, start, end);
		return messages;
	});
}
