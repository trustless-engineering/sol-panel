import { createClient } from "redis";

interface StreamProps {
  id: string;
}

export async function GET(request: Request, { params }: { params: StreamProps }): Promise<Response> {
  const redis = createClient({
    url: process.env.REDIS_URL,
  });

  await redis.connect();
  const keys = await redis.xRange(`${params.id}`, "-", "+", { COUNT: 10 });
  await redis.disconnect();

  return new Response(JSON.stringify(keys), {
    headers: { "content-type": "application/json" },
  });
}
