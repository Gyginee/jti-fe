export default interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  active: boolean;
  roles: string[];
  permissions: string[];
}
