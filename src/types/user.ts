export interface I_User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface I_UserPublic extends Omit<I_User, "password"> {}
