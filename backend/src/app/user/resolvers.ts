import axios from 'axios';
import prisma from '../../clients/db';
import JwtService from '../../services/jwt';



export interface GoogleTokenResult {
    iss?: string;
    azp?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string; 
    nbf?: string;
    name?: string;
    picture?: string;
    given_name: string; 
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
  }

const queries={
    verifyGoogleToken: async(parent:any,{token}:{token:string}) => {
        const googleToken = token;
        const googleOAuthUrl= new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOAuthUrl.searchParams.set('id_token', googleToken);
        const response = await axios.get<GoogleTokenResult>(googleOAuthUrl.toString(),{
            responseType: 'json'
        });
        const checkForUser =await prisma.user.findUnique({
            where:{
                email:response.data.email
            }
        });

        if(!checkForUser){
            await prisma.user.create({
                data:{
                    firstName:response.data.given_name,
                    lastName:response.data.family_name,
                    email:response.data.email,
                    profileImageUrl:response.data.picture
                } 
            });
        }
        const userInDb =await prisma.user.findUnique({
            where:{
                email:response.data.email
            }
        });
        // userInDb should be presemt in db

         const userToken =await JwtService.generateTokenForUser(userInDb!); 
       
         return userToken;
    },
} 

export const resolvers={
    Query:queries
}
  