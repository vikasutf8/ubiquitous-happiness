import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import  {NextResponse,NextRequest } from "next/server";

connectDB();


export async function GET(request:NextRequest) {
    try {
        //token delete - bearer token  || session creating :db also manuplicating 
        const response =NextResponse.json({
            message :"logged Successfully",
            success :true
        })

        response.cookies.set("token" ,"",{
            httpOnly :true,
            expires :new Date(0),
        })


        return response;
    } catch (error:any) {
        return NextResponse.json({error : error.message},{status : 500})
    }
}