export default function Home(): React.JSX.Element {
	return (
		<div className='container'>
			<div className='flex'>
				<div className='flex-1'>
					<h1 className='text-4xl font-bold'>Streams</h1>
					<div className='card'>
						<div className='card-body'>
							<div className='card-title'>
								<h2 className='text-2xl font-bold'>Stream 1</h2>
							</div>
							<div className='card-text'>
								<p>Stream 1 description</p>
							</div>
							<div className='card-actions'>
								<div className='button'>Check</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
