export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  organization_id: number;
  organization_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactData {
  id: string;
  type: "contacts";
  attributes: Contact;
}

export interface ContactsResponse {
  data: ContactData[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
export interface SingleContactData {
  data: ContactData;
}
