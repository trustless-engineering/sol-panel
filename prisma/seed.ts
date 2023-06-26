import { PrismaClient } from "@prisma/client";

const plugins = [
  {
    name: "Core",
    description: "Core plugin for the Stream Processor",
    version: "0.0.1",
    producers: [
      {
        name: "Core RPC",
      },
      {
        name: "Webhook",
      },
    ],
    consumers: [
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
        producers: {
          create: plugin.producers,
        },
        consumers: {
          create: plugin.consumers,
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

    console.log("Created stream: ", result);
  }
};

void main();
