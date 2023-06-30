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
    <div className="flex flex-col items-center p-2 justify-self-stretch bg-base-200">
      <h1 className="text-2xl font-bold">Active Streams</h1>
      <div className="card w-full shadow-xl bg-base-100">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
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
                      <td>
                        <Link className="link link-accent" href={`/streams/${stream.id}`}>
                          {stream.name}
                        </Link>
                      </td>
                      <td>0</td>
                      <td>{stream.enabled ? <span className="badge badge-success">active</span> : <span className="badge badge-error">inactive</span>}</td>
                      <td>
                        <div className="join">
                          <Link href={`/streams/${stream.id}/edit`} className="btn btn-xs join-item btn-outline btn-accent">
                            Edit
                          </Link>
                          <button className="btn btn-xs join-item btn-outline btn-error">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link href="/streams/new" className="btn max-w-sm btn-primary">
            New Stream
          </Link>
        </div>
      </div>
    </div>
  );
}
