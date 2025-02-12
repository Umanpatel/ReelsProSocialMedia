import { error } from "console";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

 export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",

            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            }, 
            async authorize(credentials)
            {
                // Add logic here to look up the user from the credentials supplied
                
                // if we did not find any email/password optionally (? means optinally)
                // then throw error
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Missing Email or Password.");
                }

                // Then connect with database and try to find email in database
                // For that we have to wait for database to connect, so we use "await"
                try {
                    await connectToDatabase()
                    // Then try to find one user
                    // for that we need to import User Model. write below line at the top to import
                    // " import User from "@/models/User"; "
                    // Use above User model and try to find user/email using "User.findOne"
                    // we need to write because its a database operation.
                    const user = await User.findOne({email: credentials.email})

                    // if there is no user found then throw error 
                    
                    /*
                    if(!user){
                        throw new Error("No User Found.");
                    }*/

                    // If User is exist the we need to check password.
                    // Checking password we need bcrypt.
                    // Import bcrypt first. " import bcrypt from "bcryptjs"; " 
                    
                    /*
                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )  */

                    // if user is not valid, throw error.
                    
                    /*
                    if(!isValid){
                        throw new Error("Invalid Password");
                    }*/

                    // And if password Matched then return one object
                    // You write whatever values in this object, all those values works in session.
                    
                    /*
                    return {
                        id: user._id.toString(), // convert Id into string because id is a mongoose object type.
                        email: user.email 
                    }*/

                } 
                catch (error) {
                    throw error
                }

            }
        }) 
    ],
 } 