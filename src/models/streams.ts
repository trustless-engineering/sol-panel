import { averageRate } from 'models/streams/stats';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const xprisma = prisma.$extends({
	name: 'stream',
	model: {
		stream: {
			async FooBar(): Promise<string> {
				return 'foo';
			},
		},
	},
	result: {
		stream: {
			averageRate: {
				needs: { id: true },
				compute(stream) {
					return async () => {
						return await averageRate(stream.id);
					};
				},
			},
		},
	},
});

export type StreamsClient = typeof xprisma;

export default xprisma.stream;
