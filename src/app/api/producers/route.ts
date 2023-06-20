import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(): Promise<Response> {
  try {
    const producers = await prisma.producer.findMany();

    return new Response(JSON.stringify(producers), {
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      headers: { "content-type": "application/json" },
    });
  }
}
