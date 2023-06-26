import { streamConsumerGroup } from "@/utils/streamConsumerGroup";
import { PrismaClient, type Consumer } from "@prisma/client";

interface SetupOptions {
  consumerId: string;
  groupName: string;
  consumerName: string;
  url: string;
}

let consumer: Consumer;
let options: SetupOptions;

// TODO: This should actually pull from streams. We should lookup the stream and generate a new consumer group for it
//

const setup = async (opts: SetupOptions): Promise<void> => {
  const { consumerId } = (options = opts);
  const prisma = new PrismaClient();
  consumer = await prisma.consumer.findFirstOrThrow({
    where: {
      id: consumerId,
    },
  });
};

const consume = async (): Promise<void> => {
  const streamName = `webhooks:${consumer.id}`;
  const currentId = "0";

  await streamConsumerGroup({
    streamName,
    groupName: options.groupName,
    consumerName: options.consumerName,
    startId: currentId,
    onMessage: async (message) => {
      const response = await fetch(options.url, {
        method: "POST",
        body: JSON.stringify(message),
      });

      if (response.ok) {
        return true;
      }

      return false;
    },
  });
};

export { consume, setup };
