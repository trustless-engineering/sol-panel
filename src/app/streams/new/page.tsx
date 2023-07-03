'use client';

import { useForm, type FieldValues } from 'react-hook-form';

export default function CreateStream() {
	const { register, handleSubmit } = useForm();

	const saveFormData = async (formData: FieldValues) => {
		console.log(formData);
		return await fetch('/api/streams', {
			method: 'POST',
			body: JSON.stringify(formData),
		});
	};

	return (
		<div className='flex flex-col items-center justify-self-stretch'>
			<p className='prose-xl prose'>New Stream</p>
			<div className='container p-4 bg-base-200'>
				<form onSubmit={handleSubmit(saveFormData)}>
					<div className='flex flex-col justify-items-stretch justify-between gap-2 items-center'>
						<input className='input input-bordered w-full max-w-xs' type='text' placeholder='Stream Name' {...register('name', { required: true })} />
						<input
							className='input input-bordered w-full max-w-xs'
							type='text'
							placeholder='Stream Description'
							{...register('description', { required: false })}
						/>
						<button className='btn btn-primary btn-lg'>Create Stream</button>
					</div>
				</form>
			</div>
		</div>
	);
}
