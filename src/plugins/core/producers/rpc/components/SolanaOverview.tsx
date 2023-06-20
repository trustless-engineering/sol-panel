"use client";

import { useAgentContext } from "@/contexts/AgentContext";
import { useEffect, useState } from "react";
import { type LatitudeServer } from "../types/LatitudeServer";
import DataElement from "./DataElement";

export default function SolanaOverview({ server, rpcHealth }: { server: LatitudeServer; rpcHealth: boolean }): React.JSX.Element {
  const { connected } = useAgentContext();

  const [version, setVersion] = useState<string>("Loading...");
  const [snapshot, setSnapshot] = useState<string>("Loading...");
  const [ledger, setLedger] = useState<string>("Loading...");

  const getVersion = async (): Promise<string> => {
    try {
      const result = await fetch(`http://${server.attributes.primary_ipv4}:8899`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"jsonrpc":"2.0","id":1, "method":"getVersion"}`,
      });

      if (result == null) {
        console.log("result is null");
        return "Error";
      }

      if (result.status === 200) {
        const data = await result.json();
        return data.result["solana-core"];
      }
    } catch (e) {
      console.error(e);
      return "Error";
    }

    return "Error";
  };

  const getSnapshot = async (): Promise<string> => {
    try {
      const result = await fetch(`http://${server.attributes.primary_ipv4}:8899`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"jsonrpc":"2.0","id":1, "method":"getSnapshotSlot"}`,
      });

      if (result == null) {
        console.log("result is null");
        return "Error";
      }

      if (result.status === 200) {
        const data = await result.json();
        return data.result;
      }
    } catch (e) {
      console.error(e);
      return "Error";
    }

    return "Error";
  };

  const getLedger = async (): Promise<string> => {
    try {
      const result = await fetch(`http://${server.attributes.primary_ipv4}:8899`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"jsonrpc":"2.0","id":1, "method":"getSlot"}`,
      });

      if (result == null) {
        console.log("result is null");
        return "Error";
      }

      if (result.status === 200) {
        const data = await result.json();
        return data.result;
      }
    } catch (e) {
      console.error(e);
      return "Error";
    }

    return "Error";
  };

  useEffect(() => {
    const refresh = async (): Promise<void> => {
      if (connected && rpcHealth) {
        setVersion(await getVersion());
        setSnapshot(await getSnapshot());
        setLedger(await getLedger());
      } else {
        setVersion("Loading...");
        setSnapshot("Loading...");
        setLedger("Loading...");
      }
    };

    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, rpcHealth]);

  return (
    <div className="flex flex-col bg-base-300 p-4">
      <h2 className="text-xl text-primary-content">Solana Details</h2>
      <DataElement label="Version" value={version} />
      <DataElement label="Snapshot" value={snapshot} />
      <DataElement label="Ledger" value={ledger} />
    </div>
  );
}
