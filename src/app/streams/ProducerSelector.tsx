"use client";

import { type Producer } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ProducerSelector({ setProducer }: { setProducer: (producer: Producer) => void }) {
  const [producers, setProducers] = useState<Producer[]>([]);

  useEffect(() => {
    const getProducers = async () => {
      const response = await fetch("/api/producers");
      if (!response.ok) {
        return;
      }
      const result = await response.json();
      setProducers(result);
    };
    void getProducers();
  }, []);

  return (
    <select className="select select-bordered w-full max-w-xs">
      {producers?.map((producer) => {
        return (
          <option key={producer.id} value={producer.name}>
            {producer.name}
          </option>
        );
      })}
    </select>
  );
}
