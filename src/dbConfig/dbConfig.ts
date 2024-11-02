
import mongoose from 'mongoose';

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI || " ")
        const connection = mongoose.connection; //after connecting to the database, we store the connection in a variable
        connection.on("connected", () => {
            console.log("Connected to database")
        })
        connection.on("error", (err) => {
            console.log("Error connecting to database down"+err)
            process.exit(1)
        }) 

    } catch (error) {
        console.log(error,"Error connecting to database")
    }
}