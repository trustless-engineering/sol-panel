"use client";

import { type LatitudeServer } from "../types/LatitudeServer";
import DataElement from "./DataElement";

export default function ServerOverview({ server }: { server: LatitudeServer }): React.JSX.Element {
  return (
    <div className="flex flex-col bg-base-300 p-4">
      <h2 className="card-title text-xl text-primary-content">Server Details</h2>
      <div className="flex flex-col">
        <DataElement label="ID" value={server.attributes.label} />
        <DataElement label="Operating System" value={`${server.attributes.operating_system.name} ${server.attributes.operating_system.version}`} />
        <DataElement label="IP Address" value={server.attributes.primary_ipv4} />
        <DataElement label="Location" value={`${server.attributes.region.city}, ${server.attributes.region.country} (${server.attributes.region.site.slug})`} />
        <DataElement label="CPU" value={server.attributes.specs.cpu} />
        <DataElement label="Memory" value={server.attributes.specs.ram} />
        <DataElement label="Disk" value={server.attributes.specs.disk} />
        <DataElement label="Network" value={server.attributes.specs.nic} />
      </div>
    </div>
  );
}
