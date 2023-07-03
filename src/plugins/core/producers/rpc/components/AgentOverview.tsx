'use client';

import { useAgentContext } from 'contexts/AgentContext';
import { useEffect, useState } from 'react';
import { type LatitudeServer } from '../types/LatitudeServer';
import DataElement from './DataElement';

export default function AgentOverview({ server }: { server: LatitudeServer }): React.JSX.Element {
	const { onAgentEvent } = useAgentContext();

	const [startTime, setStartTime] = useState(0);

	useEffect(() => {
		onAgentEvent('message', (event) => {
			if (event.type === 'admin.startTime') {
				const secsSinceEpoch: number = event.message.result.secs_since_epoch as number;
				setStartTime(secsSinceEpoch);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='flex flex-col bg-base-300 p-4'>
			<h2 className='card-title text-xl text-primary-content'>SP-Agent Details</h2>
			<div className='flex flex-col'>
				<DataElement label='Version' value={`v1.0.6-next.6`} />
				<DataElement label='Start Time' value={String(startTime)} />
				<DataElement label='Latency' value={`0.6ms`} />
				<DataElement label='Logs' value={`Streaming...`} />
			</div>
		</div>
	);
}
