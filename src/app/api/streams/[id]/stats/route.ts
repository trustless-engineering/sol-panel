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
  const last10 = await redis.xRevRange(`${params.id}`, "+", "-", { COUNT: 10 });
  await redis.disconnect();

  return new Response(
    JSON.stringify({
      length,
      last10,
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}
