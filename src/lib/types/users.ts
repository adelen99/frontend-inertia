export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "owner" | "user";
  email_verified_at: string | null;
  password?: string;
  remember_token?: string;
  created_at: string;
  updated_at: string;
}

export interface UserData {
  id: string;
  type: "users";
  attributes: User;
}

export interface UsersResponse {
  data: UserData[];
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

export interface SingleUserResponse {
  data: UserData;
}
