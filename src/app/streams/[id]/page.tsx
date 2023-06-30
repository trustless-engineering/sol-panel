"use client";

import { type Producer } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { synthwave84 as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import useSWR from "swr";

const getStream = async (id: string): Promise<any | null> => {
  const res = await fetch(`/api/streams/${id}`);
  const data = await res.json();
  return data;
};

const getStats = async (id: string): Promise<any> => {
  const res = await fetch(`/api/streams/${id}/stats`);
  const data = await res.json();
  return data;
};

export default function StreamPage({ params }: { params: { id: string } }): React.JSX.Element {
  const { data: stream, isLoading, error } = useSWR(params.id, getStream);
  const [stats, setStats] = useState<any>();
  const [lastMessage, setLastMessage] = useState<any>();
  useEffect(() => {
    getStats(params.id)
      .then((data) => {
        setStats(data);
        const last = data.last10[0].message;
        setLastMessage(JSON.parse(last.message));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [stream]);

  if (error) return <div>failed to load</div>;

  if (isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <div className="flex flex-col items-center p-2 justify-self-stretch">
      <div className="card w-full shadow-xl bg-base-200">
        <div className="card-body">
          <h1 className="card-title">
            <div className="flex w-full justify-between">
              <div className="title flex items-center">
                <span className="pr-2 text-4xl">{stream.name}</span>
                {stream.enabled ? <span className="badge badge-success">active</span> : <span className="badge badge-error">inactive</span>}
              </div>
              <div className="options join">
                <button className="join-item btn btn-primary">Pause</button>
                <button className="join-item btn btn-outline btn-accent">Edit</button>
              </div>
            </div>
          </h1>
          {stream.description}
          <div className="flex flex-row">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total Events</div>
                <div className="stat-value">{stats?.length}</div>
                <div className="stat-desc">Total number of events in stream</div>
              </div>

              <div className="stat">
                <div className="stat-title">Producers</div>
                <div className="stat-value">{stream.producers?.length || 0}</div>
                <div className="stat-desc">Total number of producers in stream</div>
              </div>

              <div className="stat">
                <div className="stat-title">Consumers</div>
                <div className="stat-value">{stream.consumers?.length || 0}</div>
                <div className="stat-desc">Total number of consumers in stream</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="last-event w-1/2">
              <div className="flex items-baseline gap-2">
                <span className="text-primary-content">Last Event ID: </span>
                <pre>{stats?.last10[0].id}</pre>
              </div>
              <div className="code rounded-md">
                <SyntaxHighlighter language="json5" style={theme}>
                  {JSON.stringify(lastMessage, null, 2)}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <span className="text-2xl">Producers</span>
                <table className="table w-full bg-base-200 rounded-xl p-4 mt-2">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stream.producers?.map((producer: Producer) => {
                      return (
                        <tr key={producer.id}>
                          <td>
                            <Link className="link" href={`/producers/${producer.id}`}>
                              {producer.name}
                            </Link>
                          </td>
                          <td>{producer.type}</td>
                          <td>{producer.createdAt.toLocaleString()}</td>
                          <td>
                            <div className="join">
                              <button className="btn btn-xs btn-outline btn-accent join-item">Edit</button>
                              <button className="btn btn-xs btn-outline btn-error join-item">Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-row mt-4">
                <button className="btn btn-sm btn-accent">Add Producer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
