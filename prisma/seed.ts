import { PrismaClient } from "@prisma/client";

const plugins = [
  {
    name: "Core",
    description: "Core plugin for the Stream Processor",
    version: "0.0.1",
    ProducerProviders: [
      {
        name: "Core RPC",
      },
      {
        name: "Webhook",
        configTemplate: {
          url: "https://example.com",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      },
    ],
    ConsumerProviders: [
      {
        name: "Webhook",
      },
      {
        name: "Script",
      },
      {
        name: "Database",
      },
    ],
  },
];

const streams = [
  {
    name: "Demo Stream",
    description: "A demo stream",
  },
];

const main = async (): Promise<void> => {
  const prisma = new PrismaClient();

  for (const plugin of plugins) {
    const result = await prisma.plugin.create({
      data: {
        name: plugin.name,
        description: plugin.description,
        version: plugin.version,
        ProducerProvider: {
          create: plugin.ProducerProviders,
        },
        ConsumerProvider: {
          create: plugin.ConsumerProviders,
        },
      },
    });

    console.log("Created plugin: ", result);
  }

  for (const stream of streams) {
    const result = await prisma.stream.create({
      data: {
        name: stream.name,
        description: stream.description,
      },
    });

    const webhookProvider = await prisma.producerProvider.findFirst({
      where: {
        name: "Webhook",
      },
    });

    const producer = await prisma.producer.create({
      data: {
        name: "Webhook Producer",
        provider: {
          connect: {
            id: webhookProvider?.id,
          },
        },
        stream: {
          connect: {
            id: result.id,
          },
        },
        config: {
          url: "https://webhook.site/504e7de4-2bd0-46ce-a29e-ebadd57cd75f",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      },
    });

    console.log("Created stream: ", result);
    console.log("Created producer: ", producer);
  }
};

void main();
