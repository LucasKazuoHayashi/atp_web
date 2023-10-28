export interface User {
  id?: number;
  name: string;
  username: string;
  password?: string;
  token?: string;
  roles: string[];
}
