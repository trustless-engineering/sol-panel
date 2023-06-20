"use client";

import { type Producer } from "@prisma/client";
import { useEffect, useState } from "react";

interface ProducerSelectorProps {
  setSelectedProducer: (producer: Producer) => void;
}

export default function ProducerSelector({ setSelectedProducer: setChosenProducer }: ProducerSelectorProps): React.JSX.Element {
  const [producers, setProducers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await fetch("/api/producers").then(async (res) => await res.json());
      setProducers(data);
      console.log("producers", data);
    };

    void fetchData();
  }, []);

  const handleProducerChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const producer = producers.find((producer) => producer.name === event.target.value);
    setChosenProducer(producer);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Producer</h2>
        <p>Select a configured producer:</p>
        <select className="select select-bordered w-full max-w-xs" onChange={handleProducerChange}>
          {producers.map((producer) => {
            return <option key={producer.id}>{producer.name}</option>;
          })}
        </select>
      </div>
    </div>
  );
}
