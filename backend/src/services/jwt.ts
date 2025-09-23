import jwt from 'jsonwebtoken';
import prisma from '../clients/db';
import { User } from '../../generated/prisma';
import { JwtUser } from '../interface';



class JwtService{
    public static async generateTokenForUser(user : User ) {
        const payload: JwtUser={
            id :user?.id,  
            email:user?.email, 
        }
        return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
    }

    public static decodeToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET!) as JwtUser;
    }
}



export default JwtService;