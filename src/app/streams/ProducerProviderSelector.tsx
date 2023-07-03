'use client';

import { type ProducerProvider } from '@prisma/client';
import { useEffect, useState, type ChangeEvent } from 'react';

export default function ProducerProviderSelector({ setProvider }: { setProvider: (producerProvider: ProducerProvider) => void }) {
	const [providers, setProviders] = useState<ProducerProvider[]>([]);

	useEffect(() => {
		const getProviders = async () => {
			const response = await fetch('/api/producers/providers');
			if (!response.ok) {
				return;
			}
			const result = await response.json();
			setProviders(result);
		};
		void getProviders();
	}, []);

	const handleProducerChange = (event: ChangeEvent) => {
		const target = event.target;
		if (!(target instanceof HTMLSelectElement)) {
			return;
		}
		const provider = providers.find((provider) => provider.id === target.value);
		if (provider == null) {
			return;
		}

		setProvider(provider);
	};

	return (
		<select className='select select-bordered w-full max-w-xs' onChange={handleProducerChange}>
			{providers?.map((provider) => {
				return (
					<option key={provider.id} value={provider.id}>
						{provider.name}
					</option>
				);
			})}
		</select>
	);
}
