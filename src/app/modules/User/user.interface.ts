import { Model } from "mongoose";

export type TUserRole = "admin" | "user";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
  isDeleted: boolean;
};

export interface UserModelSchema extends Model<TUser> {
  isPasswordMatched(plainTextPass: string, hashPassword: string): Promise<TUser>;
}
