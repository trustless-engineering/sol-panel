import { type ProducerProvider } from '@prisma/client';
import { useEffect, useState } from 'react';

const parseConfig = (config: any) => {
	if (config === undefined || config == null) {
		return [];
	}
	return Object.entries(config).map(([key, value]) => {
		if (typeof value === 'object') {
			return (
				<div key={key} className='flex flex-col bg-base-300 p-2 mt-2'>
					<p className='text-accent-content'>{key}</p>
					{parseConfig(value)}
				</div>
			);
		}

		if (typeof value === 'boolean') {
			return booleanField(key, value);
		}

		if (typeof value === 'number') {
			return numberField(key, value);
		}

		return (
			<div key={key} className='form-control w-full max-w-xs'>
				<label className='label'>
					<span className='label-text'>{key}</span>
				</label>
				<input key={key} className='input input-bordered w-full max-w-xs' type='text' placeholder={value as string} name={key} />
			</div>
		);
	});
};

const booleanField = (name: string, value: boolean) => {
	return (
		<div className='flex flex-row justify-between gap-2 w-full'>
			<p className='text-2xl'>{name}</p>
			<input className='input' type='checkbox' name={name} checked={value} />
		</div>
	);
};

const numberField = (name: string, value: number) => {
	return (
		<div className='flex flex-row justify-between'>
			<p className='text-2xl'>{name}</p>
			<input className='input' type='number' name={name} value={value} />
		</div>
	);
};

export default function ProducerConfigGenerator({ provider, setConfig }: { provider: ProducerProvider; setConfig: (config: any) => void }) {
	const [elements, setElements] = useState<any[]>([]);

	useEffect(() => {
		setElements(parseConfig(provider.configTemplate));
		console.log(elements[0]);
	}, [provider, setElements]);

	if (elements.length === 0) {
		return <></>;
	}

	return (
		<div className='flex flex-col items-center w-full justify-self-stretch'>
			<p className='prose-xl prose'>Producer Config</p>
			{elements}
		</div>
	);
}
