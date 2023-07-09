'use client';
import React from 'react';
import { useForm, type FieldValues } from 'react-hook-form';

import Input from 'components/atoms/inputs/input';
import Label from 'components/atoms/labels/label';
import Button from 'components/atoms/button/button';
import { ProducerType, type Producer } from '@prisma/client';

export default function NewProducer(): React.JSX.Element {
	const { register, handleSubmit } = useForm();

	const saveProducer = async (data: FieldValues) => {
		const producer: Producer = {
			id: '',
			providerId: '',
			streamId: '',
			name: data.name,
			type: ProducerType.WEBHOOK,
			config: '',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: new Date(),
		};
		return await fetch('/api/producers', {
			method: 'POST',
			body: JSON.stringify(producer),
		});
	};

	return (
		<div className='w-[500px] m-auto pt-5'>
			<h3 className='text-white uppercase text-lg font-fig-tree font-heavy text-center'>Create Producer</h3>
			<form onSubmit={handleSubmit(saveProducer)}>
				<div className='mb-5 mt-5'>
					<Label htmlFor='name' labelName='Producer Name' />
					<Input name='name' type='text' registerOptions={register} />
				</div>
				<div className='mb-5'>
					<Label htmlFor='config' labelName='Producer Config' />
					<Input name='config' type='text' registerOptions={register} />
				</div>
				<Button name='Submit' />
			</form>
		</div>
	);
}
