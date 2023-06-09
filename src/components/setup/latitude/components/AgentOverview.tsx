"use client";

import { type LatitudeServer } from "../types/LatitudeServer";
import { useAgentContext } from "@/contexts/AgentContext";
import { useEffect } from "react";

const DataElement = ({ label, value }: { label: string; value: string }): React.JSX.Element => {
  return (
    <div className="flex flex-row justify-stretch text-sm">
      <span className="justify-self-end font-bold text-primary-content">{label}:</span>
      <span className="ml-2 justify-self-start text-secondary">{value}</span>
    </div>
  );
};

export default function AgentOverview({ server }: { server: LatitudeServer }): React.JSX.Element {
  const { onAgentEvent, url, setUrl } = useAgentContext();

  useEffect(() => {
    onAgentEvent("message", (event) => {
      // TODO: parse event.data
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (url !== `ws://${server.attributes.primary_ipv4}:8910`) {
      setUrl(`ws://${server.attributes.primary_ipv4}:8910`);
    }
  }, [url, setUrl, server]);

  return (
    <div className="flex justify-start">
      <div className="flex-1">
        <div className="h-full w-auto bg-base-300">
          <div className="card-body">
            <h2 className="card-title text-xl text-primary-content">SP-Agent Details</h2>
            <div className="flex flex-col">
              <DataElement label="Version" value={`v1.0.6-next.6`} />
              <DataElement label="Latency" value={`0.6ms`} />
              <DataElement label="Logs" value={`Streaming...`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
