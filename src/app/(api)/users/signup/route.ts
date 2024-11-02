//  http://localhost:3000/api/users/signup   backend url


import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import  {NextResponse,NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import {sendMail} from "@/helpers/mailer";
connectDB();


export async function POST(request : NextRequest) {
    try {
    const {username, email, password} = await request.json();
    //validations on username email and password 
    const user = await User.findOne({email});
    if(user){
        return NextResponse.json({error : "User already exists"},{status : 400})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
        username,
        email,
        password : hashedPassword
    })

    const savedUser =await newUser.save();
    console.log(savedUser);

    //send verification mail
    await sendMail(email, "VERIFY", savedUser._id);

    return NextResponse.json({
        message : "User created successfully",
        savedUser,
        success : true
    },{status :400
    })

    } catch (error :any) {
        return NextResponse.json({error : error.message},{status : 500})
    }
}