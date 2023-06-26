import { PrismaClient } from "@prisma/client";

export async function GET(request: Request): Promise<Response> {
  const prisma = new PrismaClient();
  const result = await prisma.plugin.findMany();

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
}
