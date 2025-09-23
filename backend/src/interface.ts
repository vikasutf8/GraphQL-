import JwtService from "./services/jwt";

export interface JwtUser{
    id: string;
    email: string;
}

export interface GraphqlContext{
    user?: JwtUser 
}