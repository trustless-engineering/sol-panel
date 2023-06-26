import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function StreamPage({ params }: { params: { id: string } }): Promise<React.JSX.Element> {
  const stream = await prisma.stream.findUnique({
    where: {
      id: params.id,
    },
    include: {
      producers: true,
    },
  });

  if (stream == null) {
    return <div>Stream not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-self-stretch bg-base-200">
      <h1 className="text-2xl font-bold">{stream.name}</h1>
      <div className="card shadow-xl bg-base-100">
        <div className="card-body">
          {stream.description}
          <div className="overflow-x-auto">
            <div className="flex flex-col">
              {stream.producers?.map((producer: any) => {
                return (
                  <div key={producer.id} className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <p className="text-xl font-bold">{producer.name}</p>
                      <p className="text-sm">{producer.createdAt.getDate()}</p>
                    </div>
                    <div className="flex flex-row">
                      <button className="btn btn-xs btn-outline btn-accent">Edit</button>
                      <button className="btn btn-xs btn-outline btn-accent">Delete</button>
                    </div>
                  </div>
                );
              })}
              <div className="flex flex-row">
                <button className="btn btn-sm btn-accent">Add Producer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
