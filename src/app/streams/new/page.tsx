"use client";

import { type Producer } from "@prisma/client";
import { useState } from "react";
import ProducerSelector from "./ProducerSelector";

export default async function CreateStream(): Promise<Promise<React.JSX.Element>> {
  const [producer, setProducer] = useState<Producer>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const name = (): string | undefined => {
    return producer?.name;
  };

  return (
    <div className="flex flex-col items-center justify-self-stretch">
      <p className="prose-xl prose">New Stream</p>
      <div className="container p-4 bg-base-200">
        <div className="flex flex-row justify-items-stretch justify-between gap-4 items-center">
          <ProducerSelector setSelectedProducer={setProducer} />
          <button className="btn btn-primary btn-lg">Create Stream</button>
        </div>
      </div>
    </div>
  );
}
