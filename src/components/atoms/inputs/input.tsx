import React from 'react';
import { type InputProps } from '../../../../types';

export default function Input({ type, name, registerOptions }: InputProps) {
	return (
		<input
			type={type}
			className='w-full px-3 py-2 border border-gray-200 h-12 bg-transparent rounded-md font-fig-tree'
			{...registerOptions(name, { required: true })}
		/>
	);
}
