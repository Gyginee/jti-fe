export default interface RoleDetailModel {
  id: number;
  name: string;
  users: User[];
  permission: Permission[];
}

export interface Permission {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}
