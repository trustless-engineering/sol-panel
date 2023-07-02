import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function prismaExtend(extension: any) {
  const xprisma = prisma.$extends(extension);
  return xprisma;
}
