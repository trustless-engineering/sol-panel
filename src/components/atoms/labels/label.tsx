import React from 'react';
import { type LabelProps } from '../../../../types';

export default function Label({ htmlFor, labelName }: LabelProps) {
	return (
		<label className='text-lg text-white capitalize font-medium font-fig-tree block mb-2' htmlFor={htmlFor}>
			{labelName}
		</label>
	);
}
