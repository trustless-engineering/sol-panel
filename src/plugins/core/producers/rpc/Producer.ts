import { type Producer } from "@prisma/client";

export interface RPCProducerConfig {
  host?: string;
  solanaVersion: string;
}

export default class RPCProducer implements Producer {
  id = "core.dedicated_rpc";
  name = "Latitude.sh RPC Node";
  version = "0.1.0";
  description = "A producer that deploys a dedicated Solana RPC Node on Latitude.sh.";
  config: any;
  pluginId: string = "core.dedicated_rpc";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  eventsPerSecond: number;
  providerId: string;
  streamId: string | null;
  averageEventSize: number;

  constructor(config: RPCProducerConfig) {
    this.config = config;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
    this.eventsPerSecond = 0;
    this.averageEventSize = 0;
    this.providerId = "";
    this.streamId = null;
  }

  setup = async (): Promise<any> => {
    return await new Promise<any>((resolve, reject) => {});
  };

  start = async (): Promise<void> => {};

  stop = async (): Promise<void> => {};

  status = async (): Promise<string> => {
    return "Not implemented.";
  };
}
