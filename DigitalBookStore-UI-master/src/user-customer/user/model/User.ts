import { Role } from "./role";

export class User {
    statusCode!: number;
    error!: string;
    message!: string;
    token!: string;
//    refreshToken!: string;
//    expirationTime!: string;
    name!: string;

    email!: string;


    password!: string;

    role!: Role;
    userId!: number;




    ourUsersList!: User[];
}