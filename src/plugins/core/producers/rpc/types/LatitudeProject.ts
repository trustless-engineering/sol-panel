export interface LatitudeProject {
	id: string;
	type: string;
	attributes: Attributes;
	relationships: Relationships;
}

interface Attributes {
	name: string;
	slug: string;
	description: string;
	billing_type: string;
	billing_method: string;
	bandwidth_alert: boolean;
	environment: string;
	billing: AttributesBilling;
	team: Team;
	stats: Stats;
	created_at: Date;
	updated_at: Date;
}

interface AttributesBilling {
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

interface Team {
	id: string;
	name: string;
	slug: string;
	description: string;
	address: null;
	currency: Currency;
	status: string;
	hourly_billing: boolean;
}

interface Currency {
	id: number;
	code: string;
	name: string;
}

interface Relationships {
	billing: TeamClass;
	team: TeamClass;
}

interface TeamClass {
	meta: Meta;
}

interface Meta {
	included: boolean;
}
