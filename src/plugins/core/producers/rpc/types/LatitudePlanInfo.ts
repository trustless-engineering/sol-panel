export interface LatitudePlanInfo {
  id: string;
  type: string;
  attributes: Attributes;
}

interface Attributes {
  name: string;
  slug: string;
  line: string;
  features: Features;
  specs: Specs;
  available_in: AvailableIn[];
}

interface AvailableIn {
  region: Region;
  sites: Site[];
  pricing: Record<string, Pricing>;
}

interface Pricing {
  year?: number;
  hour?: number;
  month?: number;
}
interface Region {
  id: number;
  name: string;
  slug: string;
}

interface Site {
  id: number;
  name: string;
  slug: string;
  in_stock: boolean;
  stock_level: StockLevel;
  instant: string[];
}

enum StockLevel {
  Low = "Low",
  Unavailable = "Unavailable",
}

interface Features {
  ssh: boolean;
  raid: boolean;
  user_data: boolean;
}

interface Specs {
  cpus: Cpus[];
  memory: Memory;
  drives: Drive[];
  nics: NIC[];
  gpu: any[];
}

interface Cpus {
  type: string;
  clock: number;
  cores: number;
  count: number;
}

interface Drive {
  count: number;
  size: string;
  type: string;
}

interface Memory {
  total: number;
}

interface NIC {
  count: number;
  type: string;
}
