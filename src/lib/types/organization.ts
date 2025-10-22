export interface Organization {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationData {
  id: string;
  type: "organizations";
  attributes: Organization;
}

export interface OrganizationsResponse {
  data: OrganizationData[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  links: {
    first: string;
    next: string | null;
    path: string;
    prev: string | null;
    filters: string;
  };
}
