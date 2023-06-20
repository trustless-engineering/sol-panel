"use client";

import { type Stream } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StreamsIndex(): React.JSX.Element {
  const [streams, setStreams] = useState<Stream[]>([]);

  const fetchStreams = async (): Promise<void> => {
    const res = await fetch("/api/streams");
    const data = await res.json();
    setStreams(data);
  };

  useEffect(() => {
    void fetchStreams().then(() => {
      console.log("Streams fetched");
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-self-stretch bg-base-200">
      <h1 className="text-2xl font-bold">Active Streams</h1>
      <div className="card shadow-xl bg-base-100">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Producers</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {streams?.map((stream: Stream) => {
                  return (
                    <tr key={stream.id}>
                      <th>{stream.id}</th>
                      <td>{stream.name}</td>
                      <td>{stream.producerId}</td>
                      <td>{stream.enabled ? <span className="badge badge-success">active</span> : <span className="badge badge-error">inactive</span>}</td>
                      <td>
                        <button className="btn btn-xs btn-outline btn-accent">Edit</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link href="/streams/create" className="btn btn-primary">
            New Stream
          </Link>
        </div>
      </div>
    </div>
  );
}
