import { PrismaClient } from "@prisma/client";

export async function GET(request: Request): Promise<Response> {
  const prisma = new PrismaClient();
  const pipelines = await prisma.pipeline.findMany();

  return new Response(JSON.stringify(pipelines), {
    headers: { "content-type": "application/json" },
  });
}
