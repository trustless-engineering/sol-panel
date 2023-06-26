"use client";

import { type Producer } from "@prisma/client";
import { useState, type FormEvent } from "react";
import ProducerSelector from "../ProducerSelector";

export default function CreateStream() {
  const [producer, setProducer] = useState<Producer>();

  const handleCreateStream = (event: FormEvent) => {
    void fetch("/api/streams", {
      method: "POST",
      body: JSON.stringify({
        name: "test",
        description: "test",
        producerId: producer?.id,
      }),
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="flex flex-col items-center justify-self-stretch">
      <p className="prose-xl prose">New Stream</p>
      <div className="container p-4 bg-base-200">
        <form onSubmit={handleCreateStream}>
          <div className="flex flex-col justify-items-stretch justify-between gap-2 items-center">
            <input className="input input-bordered w-full max-w-xs" type="text" placeholder="Stream Name" />
            <input className="input input-bordered w-full max-w-xs" type="text" placeholder="Stream Description" />
            <ProducerSelector setProducer={setProducer} />
            <button className="btn btn-primary btn-lg">Create Stream</button>
          </div>
        </form>
      </div>
    </div>
  );
}
