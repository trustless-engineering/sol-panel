/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { sizeFormatter } from "human-readable";
import { useState } from "react";
import { AiOutlineRight as NextIcon, AiOutlinePlusCircle as PlusIcon } from "react-icons/ai";
import ProducerSelector from "./ProducerSelector";
import StreamCreator from "./StreamCreator";

export default function Pipelines(): React.JSX.Element {
  const [eventsPerSecond, setEventsPerSecond] = useState(10);
  const [eventSize, setEventSize] = useState(512 * 1024);

  const formatSize = sizeFormatter({
    std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
  });

  // const handleCreateStream = async (): Promise<void> => {
  //   console.log("Create Stream");

  //   const res = await fetch(`/api/streams`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: "Test Stream",
  //       description: "Test Stream Description",
  //       producer: "Core RPC",
  //       event: "blockSubscribe",
  //       eventsPerSecond: 10,
  //     }),
  //   });

  //   const data = await res.json();
  // };

  const [producer, setProducer] = useState<any>();

  return (
    <div className="container p-4 bg-base-200">
      <div className="flex flex-row justify-items-stretch justify-between gap-4 items-center">
        <ProducerSelector setSelectedProducer={setProducer} />
        <div className="next-step flex flex-col items-center h-full group">
          <div className="flex flex-row items-center justify-items-stretch justify-between rounded-lg pr-5 mb-3 group-hover:bg-base-100 group-hover:shadow-xl group-hover:border-2 border-primary">
            <NextIcon className="text-8xl text-primary-content justify-self-start" />
            <PlusIcon className="text-3xl text-success group-hover:visible invisible" />
          </div>
          <span className="text-primary-content text-sm">~{eventsPerSecond} events/s</span>
          <span className="text-accent text-xs">(~{formatSize(eventSize)}/event)</span>
        </div>
        <StreamCreator producer={producer} />
        <button className="btn btn-primary btn-lg">Create Stream</button>
      </div>
    </div>
  );
}
