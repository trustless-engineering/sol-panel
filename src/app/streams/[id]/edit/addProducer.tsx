import { type Producer, type ProducerProvider, type Stream } from '@prisma/client';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import ProducerProviderSelector from '../../ProducerProviderSelector';
import ProducerConfigGenerator from '../../new/ProducerConfigGenerator';

export default function AddProducerForm({ stream }: { stream: Stream }) {
	const { register, handleSubmit } = useForm<Producer>();
	const [provider, setProvider] = useState<ProducerProvider>();
	const [config, setConfig] = useState<any>({});

	const onSubmit: SubmitHandler<Producer> = (data) => {
		console.log(data, config);
	};

	console.log(provider);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type='text' className='input input-bordered w-full max-w-xs' placeholder='Producer Name' {...register('name', { required: true })} />
			<ProducerProviderSelector setProvider={setProvider} />
			{provider && <ProducerConfigGenerator provider={provider} setConfig={setConfig} />}
			<div className='divider'></div>
			<button className='btn btn-primary'>Add Producer</button>
		</form>
	);
}
