export default function DataElement({ label, value }: { label: string; value: string }): React.JSX.Element {
	return (
		<div className='flex flex-row justify-stretch text-sm gap-2'>
			<span className='justify-self-end font-bold text-primary-content'>{label}:</span>
			<span className='ml-2 justify-self-start text-secondary'>{value}</span>
		</div>
	);
}
