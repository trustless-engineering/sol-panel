export interface LatitudeServer {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

interface Attributes {
  hostname: string;
  label: string;
  role: string;
  primary_ipv4: string;
  status: string;
  ipmi_status: string;
  created_at: string;
  region: Region;
  team: Team;
  project: Project;
  plan: Plan;
  operating_system: OperatingSystem;
  specs: Specs;
}

interface Region {
  city: string;
  country: string;
  site: Site;
}

interface Site {
  id: number;
  name: string;
  slug: string;
  facility: string;
}

interface Team {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: any;
  currency: Currency;
  status: string;
  hourly_billing: boolean;
}

interface Currency {
  id: number;
  code: string;
  name: string;
}

interface Project {
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

interface Plan {
  id: string;
  name: string;
  slug: string;
}

interface OperatingSystem {
  name: string;
  slug: string;
  version: string;
  features: Features;
  distro: Distro;
}

interface Features {
  raid: boolean;
  rescue: boolean;
  ssh_keys: boolean;
  user_data: boolean;
}

interface Distro {
  name: string;
  slug: string;
  series: string;
}

interface Specs {
  cpu: string;
  disk: string;
  ram: string;
  nic: string;
}

interface Relationships {
  project: Project2;
  team: Team2;
}

interface Project2 {
  meta: Meta;
}

interface Meta {
  included: boolean;
}

interface Team2 {
  meta: Meta2;
}

interface Meta2 {
  included: boolean;
}
