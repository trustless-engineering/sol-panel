import { PrismaClient } from "@prisma/client";

interface ConsumerProps {
  id: string;
}

export async function PUT(request: Request, { params }: { params: ConsumerProps }): Promise<Response> {
  const prisma = new PrismaClient();

  const data = await request.json();
  const result = await prisma.consumer.update({ where: { id: params.id }, data });

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
}
