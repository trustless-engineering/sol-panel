export interface SetupOptions {
	consumerId: string;
	groupName: string;
	consumerName: string;
}

export interface ConsumerJob {
	setup: (opts: SetupOptions) => Promise<void>;
	consume: () => Promise<void>;
}
