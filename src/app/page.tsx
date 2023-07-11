import { PrismaClient } from '@prisma/client';

export default async function Home() {
	const prisma = new PrismaClient();

	const streams = await prisma.stream.findMany();

	return (
		<div className='container'>
			<div className='flex'>
				<div className='flex-1'>
					<h1 className='text-4xl font-bold'>Streams</h1>
					{streams.map((stream) => {
						return (
							<div key={stream.id} className='card bg-base-200 w-96'>
								<div className='card-body'>
									<div className='card-title'>
										<h2 className='text-2xl font-bold'>{stream.name}</h2>
									</div>
									<div className='card-text'>
										<p>{stream.description}</p>
									</div>
									<div className='card-actions'>
										<div className='btn btn-accent'>Details</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
