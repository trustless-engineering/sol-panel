import Streams from 'models/streams';
import Link from 'next/link';

import { type Stream } from '@prisma/client';

export default async function StreamsIndex() {
	const streams = await Streams.findMany();

	return (
		<div className='flex flex-col items-center m-4 justify-self-stretch'>
			<div className='card w-full shadow-xl bg-base-200'>
				<div className='card-body'>
					<div className='card-title'>
						<h1 className='text-2xl font-bold'>Active Streams</h1>
					</div>
					<div className='overflow-x-auto'>
						<table className='table'>
							{/* head */}
							<thead>
								<tr>
									<th>Name</th>
									<th>Producers</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{streams?.map((stream: Stream) => {
									return (
										<tr key={stream.id}>
											<td>
												<Link className='link link-accent' href={`/streams/${stream.id}`}>
													{stream.name}
												</Link>
											</td>
											<td>0</td>
											<td>{stream.enabled ? <span className='badge badge-success'>active</span> : <span className='badge badge-error'>inactive</span>}</td>
											<td>
												<div className='join'>
													<Link href={`/streams/${stream.id}/edit`} className='btn btn-xs join-item btn-outline btn-accent'>
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
					<Link href='/streams/new' className='btn max-w-sm btn-primary'>
						New Stream
					</Link>
				</div>
			</div>
		</div>
	);
}
