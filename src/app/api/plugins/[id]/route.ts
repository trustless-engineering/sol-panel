import { PrismaClient } from "@prisma/client";

interface PluginProps {
  id: string;
}

export async function PUT(request: Request, { params }: { params: PluginProps }): Promise<Response> {
  const prisma = new PrismaClient();

  const data = await request.json();
  const result = await prisma.plugin.update({ where: { id: params.id }, data });

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
}
