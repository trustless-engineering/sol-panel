import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(request: Request): Promise<Response> {
	const streams = await prisma.stream.findMany({
		include: { producers: true, consumers: true },
	});

	return new Response(JSON.stringify(streams), {
		headers: { 'content-type': 'application/json' },
	});
}

export async function POST(request: Request): Promise<Response> {
	const data = await request.json();
	const result = await prisma.stream.create({ data });

	return new Response(JSON.stringify(result), {
		headers: { 'content-type': 'application/json' },
	});
}

export async function DELETE(request: Request): Promise<Response> {
	const data = await request.json();
	const result = await prisma.stream.delete({ where: { id: data.id } });

	return new Response(JSON.stringify(result), {
		headers: { 'content-type': 'application/json' },
	});
}
