import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const authenticateToken= (request,response,next) =>{
    const authheader = request.headers['Authorization'];
    const token = authheader && authheader.split(' ')[1];
    if(token==null){
        return response.status(401).json({msg: "token is required"});
    }

    jwt.verify(token,process.env.A_S_K,(error,user)=>{
        if(error){
            return response.status(403).json({msg: "token is invalid"});
        }
        request.user = user;
        next();
    }) 
}