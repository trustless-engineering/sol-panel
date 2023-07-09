import { PrismaClient } from '@prisma/client';

export async function GET(): Promise<Response> {
	const prisma = new PrismaClient();
	const result = await prisma.producer.findMany();

	return new Response(JSON.stringify(result), {
		headers: { 'content-type': 'application/json' },
	});
}

export async function POST(request: Request): Promise<Response> {
	const data = await request.json();
	const prisma = new PrismaClient();
	const result = await prisma.producer.create({ data });

	return new Response(JSON.stringify(result), {
		headers: { 'Content-Type': 'application/json' },
	});
}
