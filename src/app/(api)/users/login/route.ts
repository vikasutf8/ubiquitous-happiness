//   http://localhost:3000/api/users/login   backend url



import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import  {NextResponse,NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
connectDB();

export async function POST(request :NextRequest){
    try {
        const { email, password} = await request.json();
        //validations on username email and password 
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error : "User not exists |check email"},{status : 400})
        }

        console.log("user exist",user);

        const validpassword  =await bcryptjs.compare(password ,user.password);
        if(!validpassword){
            return NextResponse.json({error : "Check your Credential"},{status : 400})
        }

        //every thing is fine[password,email,username,role] now,we have to create jwt token -- we insert our payload( yani -> data);

        const jwttoken ={
            id :user._id,
            username :user.username,
            email :user.email
        }

        const token :string  =await jwt.sign(jwttoken,process.env.TOKEN_SECRET!,{expiresIn :'1h'});

        const response =NextResponse.json({
            message: "User logged IN",
            success :true
        })

        //embbeded cookies
        response.cookies.set("token",token,{
            httpOnly :true,
        })

        return response;


    } catch (error:any) {
        return NextResponse.json({error : error.message},{status : 500})
    }
}

