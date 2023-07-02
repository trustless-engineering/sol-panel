import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const xprisma = prisma.$extends({
  name: "stream",
  model: {
    stream: {
      async FooBar(): Promise<string> {
        return "foo";
      },
    },
  },
  result: {
    stream: {
      friendlyId: {
        needs: { id: true },
        compute(stream): string {
          return `stream.${stream.id}`;
        },
      },
    },
  },
});

export type StreamsClient = typeof xprisma;

export default xprisma.stream;
