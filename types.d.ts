import { type UseFormRegister } from 'react-hook-form';

export interface InputProps {
	type: 'password' | 'text';
	name: string;
	registerOptions: UseFormRegister<any>;
}

export interface LabelProps {
	htmlFor: string;
	labelName: string;
}

export interface ButtonProps {
	name: string;
	onClick?: () => void;
}
