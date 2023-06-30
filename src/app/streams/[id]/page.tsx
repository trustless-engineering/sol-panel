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
    <div className="flex flex-col items-center p-2 justify-self-stretch bg-base-200">
      <h1 className="text-4xl font-bold mb-4">{stream.name}</h1>
      <div className="card w-full shadow-xl bg-base-100">
        <div className="card-body">
          {stream.description}
          <div className="divider"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              {stream.producers?.map((producer: any) => {
                return (
                  <div key={producer.id} className="flex flex-row w-1/2 bg-base-200 justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm">Name: {producer.name}</p>
                      <p className="text-sm">Created: {(producer.createdAt as Date).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-row">
                      <button className="btn btn-xs btn-outline btn-accent">Edit</button>
                      <button className="btn btn-xs btn-outline btn-accent">Delete</button>
                    </div>
                  </div>
                );
              })}
              <div className="flex flex-row mt-4">
                <button className="btn btn-sm btn-accent">Add Producer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
