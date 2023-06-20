"use client";

import { type Producer } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ProducerSelector({ setProducer }: { setProducer: (producer: Producer) => void }): React.JSX.Element {
  const [producers, setProducers] = useState<any[]>([]);
  const [selectedProducer, setSelectedProducer] = useState<Producer>();

  const getProducers = async (): Promise<void> => {
    const data = await fetch("/api/producers").then(async (res) => await res.json());
    setProducers(data);
    console.log("producers", data);
    if (selectedProducer === undefined) {
      setSelectedProducer(data[0]);
    }
  };

  const handleProducerSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const producer = producers.find((producer) => producer.name === event.target.value);
    setSelectedProducer(producer);
    setProducer(producer);
  };

  useEffect(() => {
    void getProducers();
  }, []);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Producer</h2>
        <p>Select a configured producer:</p>
        <select onChange={handleProducerSelect} className="select select-bordered w-full max-w-xs">
          {producers.map((producer) => {
            return (
              <option key={producer.id} value={producer.name}>
                {producer.name}
              </option>
            );
          })}
        </select>
        <div className="divider"></div>
      </div>
    </div>
  );
}
