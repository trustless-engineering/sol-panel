import { PrismaClient } from "@prisma/client";

export async function GET(): Promise<Response> {
  const prisma = new PrismaClient();
  const result = await prisma.producerProvider.findMany();

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
}
