"use client";

import { type Producer, type Stream } from "@prisma/client";
import { sizeFormatter } from "human-readable";
import { useState } from "react";

export default function StreamCreator({
  streams,
  setStream,
  producer,
}: {
  streams?: Stream[];
  setStream?: (stream: Stream) => void;
  producer: Producer;
}): React.JSX.Element {
  const minStreamSize = 0;
  const maxStreamSize = 100_000;
  const defaultStreamSize = 10_000;

  const [streamSize, setStreamSize] = useState(defaultStreamSize);
  const [selectedStream, setSelectedStream] = useState(null);

  const handleStreamChange = (event: any): void => {
    setSelectedStream(event.target.value);
  };

  const handleStreamSizeChange = (event: any): void => {
    setStreamSize(event.target.value);
  };

  const formatSize = sizeFormatter({
    std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
  });

  if (producer === null || producer === undefined) {
    return <></>;
  }

  if (streams === null || streams === undefined) {
    return <></>;
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Stream</h2>
        <p>Select a stream or create a new one:</p>
        <select onChange={handleStreamChange} className="select select-bordered w-full max-w-xs">
          {streams.map((stream) => {
            return (
              <option key={stream.id} value={stream.id}>
                {stream.name}
              </option>
            );
          })}
          <option>New...</option>
        </select>
        <div className="divider"></div>
        {selectedStream === "New..." && (
          <div className="flex flex-col gap-2">
            <p>Create a new stream:</p>
            <div className="form-control">
              <input className="input input-primary w-full max-w-xs" type="text" placeholder="Stream Name" />
            </div>
            <div className="form-control">
              <textarea className="textarea textarea-bordered w-full max-w-xs" placeholder="Stream Description" />
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Max Events</span>
                <input
                  type="number"
                  value={streamSize}
                  min={minStreamSize}
                  max={maxStreamSize}
                  onChange={handleStreamSizeChange}
                  className="input input-primary w-1/2"
                />
              </label>
              <input
                type="range"
                min={minStreamSize}
                max={maxStreamSize}
                value={streamSize}
                onChange={handleStreamSizeChange}
                className="range range-xs"
                step="10000"
              />
              <div className="w-full flex justify-between text-xs p-2">
                <span>
                  At an average {formatSize(producer.averageEventSize)} per event, this stream will incur a memory cost of{" "}
                  {formatSize(streamSize * producer.averageEventSize)}.
                </span>
              </div>
            </div>

            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Encrypt at Rest</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked={true} />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
