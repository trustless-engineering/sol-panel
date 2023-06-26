import { PrismaClient } from "@prisma/client";

interface PipelineProps {
  id: string;
}

export async function PUT(request: Request, { params }: { params: PipelineProps }): Promise<Response> {
  const prisma = new PrismaClient();

  const data = await request.json();
  const result = await prisma.pipeline.update({ where: { id: params.id }, data });

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
}
