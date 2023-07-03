import { PrismaClient, type Stream } from '@prisma/client';

interface ProducerProps {
	id: string;
}

export async function GET(request: Request, { params }: { params: ProducerProps }): Promise<Response> {
	console.log(params);
	const prisma = new PrismaClient();
	const result = await prisma.producer.findUnique({ where: { id: params.id }, include: { stream: true } });

	return new Response(JSON.stringify(result), {
		headers: { 'content-type': 'application/json' },
	});
}

export async function PUT(request: Request, { params }: { params: ProducerProps }): Promise<Response> {
	const prisma = new PrismaClient();

	const data: Stream = await request.json();
	const result = await prisma.producer.update({ where: { id: params.id }, data });

	return new Response(JSON.stringify(result), {
		headers: { 'content-type': 'application/json' },
	});
}
