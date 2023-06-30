import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

const getProducer = async (id: string) => {
  return await prisma.producer.findUnique({
    where: {
      id,
    },
  });
};

export default async function ProducerPage({ params }: { params: { id: string } }) {
  const producer = await getProducer(params.id);

  if (!producer) {
    return (
      <div className="flex flex-col items-center p-2 justify-self-stretch">
        <div className="card w-full shadow-xl bg-base-200">
          <div className="card-body">
            <h1 className="card-title">Producer not found</h1>
          </div>
        </div>
      </div>
    );
  }

  const header = headers();
  const host = header.get("host");

  return (
    <div className="flex flex-col items-center p-2 justify-self-stretch">
      <div className="card w-full shadow-xl bg-base-200">
        <div className="card-body">
          <h1 className="card-title">{producer.name}</h1>

          <div className="flex flex-row gap-2">
            <span className="font-bold">Webhook URL:</span>
            <span className="monospace">
              <code>
                https://{host}/webhooks/{producer.id}
              </code>
            </span>
          </div>

          <div className="flex flex-row gap-2">
            <span className="font-bold">Webhook Method:</span>
            <span className="monospace">
              <code>POST</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
