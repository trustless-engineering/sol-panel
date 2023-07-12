import React from 'react';
import { type ButtonProps } from '../../../../types';

export default function Button({ name, onClick }: ButtonProps) {
	return (
		<button
			onClick={
				onClick
					? () => {
							onClick();
					  }
					: () => {}
			}
			className='bg-primary h-12 text-white font-fig-tree font-semibold w-full rounded-md'
		>
			{name}
		</button>
	);
}
