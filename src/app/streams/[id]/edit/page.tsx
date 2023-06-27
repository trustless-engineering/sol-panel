"use client";

import { useEffect, useState } from "react";
import AddProducerForm from "./addProducer";

export default function EditStreamPage({ params }: { params: { id: string } }) {
  const [stream, setStream] = useState<any>();

  useEffect(() => {
    const getStream = async () => {
      const response = await fetch(`/api/streams/${params.id}`);
      if (!response.ok) {
        return;
      }
      const result = await response.json();
      setStream(result);
    };
    void getStream();
  }, [setStream]);

  if (!stream) {
    return <div className="loading loading-lg"></div>;
  }

  return (
    <div className="flex flex-col items-center p-4 justify-self-stretch bg-base-200">
      <div className="card w-3/4 shadow-xl bg-base-100">
        <div className="card-body">
          <div className="card-title">
            <h1 className="text-2xl font-bold">Stream: {stream.name}</h1>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="overflow-x-auto">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm">Date Created: {stream.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="producers" className="col-span-2">
              <span className="text-xl font-bold">Producers</span>
              {stream.producers && stream.producers?.length === 0 && <p>No Producers</p>}
              {stream.producers?.map((producer: any) => {
                return (
                  <div key={producer.id} className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <p className="text-xl font-bold">{producer.name}</p>
                      <p className="text-sm">Date Created: {producer.createdAt}</p>
                    </div>
                    <div className="flex flex-row">
                      <button className="btn btn-xs btn-outline btn-accent">Edit</button>
                      <button className="btn btn-xs btn-outline btn-accent">Delete</button>
                    </div>
                  </div>
                );
              })}
              <div className="divider">
                <div className="divider-text">Add Producer</div>
              </div>
              <AddProducerForm stream={stream} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
