import { commandOptions, createClient } from "redis";

interface StreamReaderOptions {
  streamName: string;
  startId: string;
  onMessage: (message: any) => Promise<boolean>;
}

const streamReader = async ({ streamName, startId = "0-0", onMessage }: StreamReaderOptions): Promise<void> => {
  console.log(`starting streamReader instance for ${streamName} at ${startId}`);

  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (err) => {
    console.log("Redis error: ", err);
  });

  await redisClient.connect();

  while (true) {
    try {
      const response = await redisClient.xRead(
        commandOptions({
          isolated: true,
        }),
        [
          {
            key: streamName,
            id: startId,
          },
        ],
        {
          COUNT: 1,
          BLOCK: 5000,
        }
      );

      if (response != null) {
        const message = response[0].messages[0];
        startId = message.id;
        await onMessage(message);
      } else {
        // No messages in stream
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
};

export { streamReader };
