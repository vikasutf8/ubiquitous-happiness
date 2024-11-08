import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import  {NextResponse,NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


export const getDateFromToken =(request :NextRequest)=>{
try {
    const token= request.cookies.get("token")?.value || "";
    //decode token
    const decodeToken :any =jwt.verify(token,process.env.TOKEN_SECRET!)
    
    return decodeToken.id; // this id from token that we save at time of login
    //we have to design an interface that replace any;

} catch (error:any) {
    throw new Error(error.message)
}
}