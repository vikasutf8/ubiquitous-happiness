// how to verify - user url via link aaya that onclick on link - user get new page[now new page- click to verify button present[url se token extract kar body ke sath me send kar dege](manually click par verify karna better options else direct link par click par token sending facing issue sometime)]




import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import  {NextResponse,NextRequest } from "next/server";

connectDB();

export async function POST(request :NextRequest){
    try {
        const reqBody =await request.json();
        const {token} =reqBody;
        console.log("token = " ,token)

        const user = await User.findOne({verifyToken :token},
            {verifyTokenExpiry : {$gt :Date.now()}});

        if(!user) return NextResponse.json({error :"invalid token as verifyEmail"},{status:400});

        console.log(user);

        //cleaning and updating model field
        user.isVerified =true;
        user.verifyToken =undefined;
        user.verifyTokenExpiry =undefined;

        await user.save();

        return NextResponse.json({
            message :"User verified via Email",
            success :true,
        },{status :200});
        

        
    } catch (error:any) {
        return NextResponse.json({error :error.message},{status:500});
    }
}

