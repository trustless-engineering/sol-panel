import { createClient } from "redis";

interface StreamConsumerGroupOptions {
  streamName: string;
  groupName: string;
  consumerName: string;
  startId: string;
  onMessage: (message: any) => Promise<boolean>;
}

const client = createClient({
  url: process.env.REDIS_URL,
});

const createGroup = async (streamName: string, groupName: string): Promise<void> => {
  try {
    await client.xGroupCreate(streamName, groupName, "0", {
      MKSTREAM: true,
    });
    console.log(`Created consumer group ${groupName} for stream ${streamName}`);
  } catch (e) {
    console.log(`Consumer group ${groupName} for stream ${streamName} already exists`, e);
  }
};

const streamConsumerGroup = async ({ streamName, groupName, consumerName, startId = "0", onMessage }: StreamConsumerGroupOptions): Promise<void> => {
  console.log(`starting consumer group instance for ${streamName} with ${groupName} at ${startId}`);

  client.on("error", (err) => {
    console.log("Redis error: ", err);
  });

  await client.connect();

  await createGroup(streamName, groupName);

  while (true) {
    try {
      const response = await client.xReadGroup(
        groupName,
        consumerName,
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

      if (response != null && response[0].messages.length > 0) {
        const message = response[0].messages[0];
        const status = await onMessage(message);

        if (status) {
          // Message processed, ack it
          console.log(`Message ${message.id} processed, acking it.`);
          const entryId = message.id;
          await client.xAck(streamName, groupName, entryId);
        } else {
          // Message not processed, retry
          console.error("Message not processed, aborting consumer group.");
          process.exit(1);
        }
      } else {
        if (startId !== ">") {
          console.log(`Consumer group PEL ${groupName} for stream ${streamName} is empty, waiting for new messages`);
          startId = ">";
        }
        // No messages in stream, all caught up
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
};

export { streamConsumerGroup };
