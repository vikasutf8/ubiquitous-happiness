import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import  {NextResponse,NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { getDateFromToken } from "@/helpers/dataFromToken";
connectDB();

export async function POST(request :NextRequest){
    try {
        //extract id from token --utilty or here
        const userId = await getDateFromToken(request);

        const user =await User.findOne({_id :userId}).select("-password");

        if(!user){
            return NextResponse.json({error :"user is not getting from token"},{status:500});
        }

        return NextResponse.json({
            message:"User getting all data",
            data :user
        })



    } catch (error:any) {
        return NextResponse.json({error :error.message},{status:500});
    }
}