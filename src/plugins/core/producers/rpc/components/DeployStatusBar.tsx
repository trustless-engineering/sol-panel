import { useEffect } from 'react';
import { type LatitudeProject } from '../types/LatitudeProject';
import { type LatitudeServer } from '../types/LatitudeServer';
import { type LatitudeUserdata } from '../types/LatitudeUserdata';

interface DeployStatusBarProps {
	project: LatitudeProject | undefined;
	userdata: LatitudeUserdata | undefined;
	server: LatitudeServer | null;
}

export default function DeployStatusBar({ project, userdata, server }: DeployStatusBarProps): React.JSX.Element {
	const projectStatus = (): React.JSX.Element => {
		console.log(project);
		if (project != null) {
			return <span className='badge badge-success'>created (id: {project.id})</span>;
		} else {
			return <span className='badge badge-info'>creating...</span>;
		}
	};

	const userdataStatus = (): React.JSX.Element => {
		if (userdata != null) {
			return <span className='badge badge-success'>created (id: {userdata.id})</span>;
		} else {
			return <span className='badge badge-info'>creating...</span>;
		}
	};

	const serverStatus = (): React.JSX.Element => {
		if (server != null) {
			return <span className='badge badge-success'>created (id: {server.id})</span>;
		} else {
			return <span className='badge badge-info'>creating...</span>;
		}
	};

	useEffect(() => {});

	return (
		<div className='flex w-full flex-row justify-evenly text-xs lg:text-lg'>
			<div className='flex justify-center'>
				<span className='text-md invisible self-center font-bold text-primary-content md:visible'>Project:</span>
				<span className='text-md mx-2 self-center font-bold text-accent'>{projectStatus()}</span>
			</div>
			<div className='flex justify-center'>
				<span className='text-md invisible self-center font-bold text-primary-content md:visible'>User Data:</span>
				<span className='text-md mx-2 self-center font-bold text-accent'>{userdataStatus()}</span>
			</div>
			<div className='flex justify-center'>
				<span className='text-md invisible self-center font-bold text-primary-content md:visible'>Server:</span>
				<span className='text-md mx-2 self-center font-bold text-accent'>{serverStatus()}</span>
			</div>
		</div>
	);
}
