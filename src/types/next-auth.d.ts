import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
  _id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  isVerify: boolean;
  type: string;
  role: string;
  address: string;
  gender: string;
  age: int;
  createdAt: string;
  updatedAt: string;
}

interface IUpload {
  _id: string;
  email: string;
  name: string;
  role: string;
  type: string;
}

interface ITracks {
  _id: string;
  title: string;
  description: string;
  category: string;
  imgUrl: string;
  trackUrl: string;
  countLike: number;
  countPlay: number;
  uploader: IUpload;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
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
