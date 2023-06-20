import { PrismaClient } from "@prisma/client";

const main = async (): Promise<void> => {
  const prisma = new PrismaClient();

  const plugin = await prisma.plugin.create({
    data: {
      name: "Core RPC",
      version: "0.0.1",
      description: "Core RPC Plugin",
      config: {
        hostname: "rpc.wed.tm",
      },
    },
  });

  console.log(plugin);

  const producer = await prisma.producer.create({
    data: {
      name: "Core RPC",
      pluginId: plugin.id,
      eventsPerSecond: 3,
      averageEventSize: 2048,
    },
  });

  console.log(producer);
};

void main();
