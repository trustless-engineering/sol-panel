import { createClient } from "redis";

export async function GET(request: Request): Promise<Response> {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on("error", (error) => {
    console.error(error);
  });

  await client.connect();

  const redisStreams = await client.keys("streams:*");

  return new Response(JSON.stringify(redisStreams), {
    headers: { "content-type": "application/json" },
  });
}
