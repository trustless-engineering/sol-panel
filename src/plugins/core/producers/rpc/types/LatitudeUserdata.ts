export interface LatitudeUserdata {
	id: string;
	type: string;
	attributes: Attributes;
	relationships: Relationships;
}

interface Attributes {
	description: string;
	content: string;
	created_at: Date;
	updated_at: Date;
	project: AttributesProject;
	user: User;
}

interface AttributesProject {
	id: number;
	name: string;
	slug: string;
	description: string;
	billing_type: string;
	billing_method: string;
	bandwidth_alert: boolean;
	environment: string;
	billing: Billing;
	stats: Stats;
}

interface Billing {
	subscription_id: string;
	type: string;
	method: string;
}

interface Stats {
	ip_addresses: number;
	prefixes: number;
	servers: number;
	vlans: number;
}

interface User {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	authentication_factor_id: string;
	created_at: Date;
	updated_at: Date;
	role: Role;
}

interface Role {
	id: string;
	name: string;
	created_at: Date;
	updated_at: Date;
}

interface Relationships {
	user: UserClass;
	project: UserClass;
}

interface UserClass {
	meta: Meta;
}

interface Meta {
	included: boolean;
}
