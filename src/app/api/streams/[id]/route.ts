import { PrismaClient, type Stream } from "@prisma/client";

interface StreamProps {
  id: string;
}

export async function GET(request: Request, { params }: { params: StreamProps }): Promise<Response> {
  const prisma = new PrismaClient();
  const result = await prisma.stream.findUnique({ where: { id: params.id }, include: { producers: true, consumers: true } });

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
}

export async function PUT(request: Request, { params }: { params: StreamProps }): Promise<Response> {
  const prisma = new PrismaClient();

  const data: Stream = await request.json();
  const result = await prisma.stream.update({ where: { id: params.id }, data });

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
}
