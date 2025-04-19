import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
  _id: string;
  username: string;
  name: string;
  email: string;
  isVerify: boolean;
  type: string;
  role: string;
  address: string;
  gender: string;
  age: int;
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: IUser;
  }
}

declare module "next-auth" {
  interface Session {
    user: IUser;
    access_token: string;
    refresh_token: string;
  }
}
