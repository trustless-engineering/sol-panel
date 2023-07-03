import { PrismaClient } from '@prisma/client';

export async function GET(): Promise<Response> {
	const prisma = new PrismaClient();
	const result = await prisma.producer.findMany();

	return new Response(JSON.stringify(result), {
		headers: { 'content-type': 'application/json' },
	});
}
