import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import { hash } from 'crypto';

export const sendMail = async (email: string, emailtype: string, userId: string) => {
     
    //todo : implement the logic to send mail
    try {

        const hashedToken = await bcryptjs.hash(userId, 10);
        if(emailtype === "VERIFY"){
            //send verification mail
            await User.findByIdAndUpdate(
              userId,
              {
                  verifyToken : hashedToken,
                  verifyTokenExpiry : Date.now() + 3600000
              }
             )
        }
        else if(emailtype === "RESET"){
            //send reset password mail
            await User.findByIdAndUpdate(
              userId,
              {
                forgetPasswordToken : hashedToken,
                forgetPasswordTokenExpiry : Date.now() + 36000000
              }
             )
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true,
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from: 'vikas@gmail.com', 
            to: email, 
            subject: emailtype === "VERIFY" ? "Verify your email" : "Reset your password", 
            html: emailtype === "VERIFY" ? `<a href="http://localhost:3000/verify/${hashedToken}">Click here to verify your email</a>` : `<a href="http://localhost:3000/reset/${hashedToken}">Click here to reset your password</a>`, 
          }


          const mailResponse = await transporter.sendMail(mailOptions);
          return mailResponse;
     } catch (error : any) {
         console.log(error, "Error sending mail")
        throw new Error("Error sending mail")
     }
}