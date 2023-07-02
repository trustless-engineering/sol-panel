import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const xprisma = prisma.$extends({
  name: "producers",
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
        compute(producer): string {
          return `producer.${producer.id}`;
        },
      },
    },
  },
});

export default xprisma.producer;
