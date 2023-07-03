'use client';

import { type Producer } from '@prisma/client';
import { type Route } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProducersIndex(): React.JSX.Element {
	const [producers, setProducers] = useState<Producer[]>([]);

	const fetchProducers = async (): Promise<void> => {
		const res = await fetch('/api/producers');
		const data = await res.json();
		setProducers(data);
	};

	useEffect(() => {
		void fetchProducers();
	}, []);

	return (
		<div className='flex flex-col items-center p-2 justify-self-stretch'>
			<h1 className='text-2xl font-bold'>Producers</h1>
			<div className='card w-full shadow-xl bg-base-200'>
				<div className='card-body'>
					<div className='overflow-x-auto'>
						<table className='table'>
							{/* head */}
							<thead>
								<tr>
									<th>Name</th>
									<th>Type</th>
									<th>Stream ID</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{producers?.map((producer: Producer) => {
									return (
										<tr key={producer.id}>
											<td>
												<Link className='link link-accent' href={('/producers/' + producer.id) as Route}>
													{producer.name}
												</Link>
											</td>
											<td>{producer.type}</td>
											<td>
												<Link href={`/streams/${producer.streamId}`} className='link'>
													{producer.streamId}
												</Link>
											</td>
											<td>
												<div className='join'>
													<Link href={`/producers/${producer.id}`} className='btn btn-xs join-item btn-outline btn-accent'>
														Edit
													</Link>
													<button className='btn btn-xs join-item btn-outline btn-error'>Delete</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<Link href='/producers/new' className='btn max-w-sm btn-primary'>
						New Producer
					</Link>
				</div>
			</div>
		</div>
	);
}
