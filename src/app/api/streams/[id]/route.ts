import { PrismaClient, type Stream } from "@prisma/client";
import { createClient } from "redis";

interface StreamProps {
  id: string;
}

export async function GET(request: Request, { params }: { params: StreamProps }): Promise<Response> {
  const redis = createClient({
    url: process.env.REDIS_URL,
  });

  await redis.connect();
  const length = await redis.xLen(`${params.id}`);
  const lastKey = await redis.xRevRange(`${params.id}`, "+", "-", { COUNT: 1 });
  await redis.disconnect();

  return new Response(
    JSON.stringify({
      length,
      lastKey,
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}

export async function PUT(request: Request, { params }: { params: StreamProps }): Promise<Response> {
  const prisma = new PrismaClient();

  const data: Stream = await request.json();
  const result = await prisma.stream.update({ where: { id: params.id }, data });

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
}
