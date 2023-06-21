import { createClient } from "redis";

export async function GET(request: Request): Promise<Response> {
  const redis = createClient({
    url: process.env.REDIS_URL,
  });

  redis.on("error", (error) => {
    console.error(error);
  });

  await redis.connect();

  const streams = await redis.keys("streams:*");

  return new Response(JSON.stringify(streams), {
    headers: { "content-type": "application/json" },
  });
}
