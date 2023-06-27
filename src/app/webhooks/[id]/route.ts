import { PrismaClient } from "@prisma/client";
import { type NextRequest } from "next/server";
import * as redis from "redis";

const prisma = new PrismaClient();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});

interface WebhookRequestParams {
  id: string;
}

const sendMessage = async (streamId: string, message: any): Promise<void> => {
  await redisClient.connect();
  try {
    await redisClient.xAdd(`webhooks:${streamId}`, "*", { message: JSON.stringify(message) });
  } catch (e) {
    console.log("Failed to send message to redis", e);
  } finally {
    await redisClient.disconnect();
  }
};

export async function POST(request: NextRequest, { params }: { params: WebhookRequestParams }): Promise<Response> {
  try {
    const producer = await prisma.producer.findUnique({
      where: { id: params.id },
    });

    if (!producer) {
      return new Response(
        JSON.stringify({
          error: "Producer not found",
        }),
        {
          headers: { "content-type": "application/json" },
          status: 404,
        }
      );
    }

    const body = await request.json();

    await sendMessage(params.id, body);

    return new Response(
      JSON.stringify({
        message: "Message sent to producer",
      }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: "Failed to send message to producer",
      }),
      {
        headers: { "content-type": "application/json" },
        status: 500,
      }
    );
  }
}
