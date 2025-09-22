import jwt from 'jsonwebtoken';
import prisma from '../clients/db';
import { User } from '../../generated/prisma';



class JwtService{
    public static async generateTokenForUser(user : User ) {
        const payload={
            id :user?.id,  
            email:user?.email, 
        }
        return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
    }
}



export default JwtService;