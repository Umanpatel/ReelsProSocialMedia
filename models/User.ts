 import mongoose, { Schema, model, models } from "mongoose";
 import bcrypt from "bcryptjs";

 export interface IUser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId; // we can not define direct string type bez it's a mongoDB's object
    createdAt?: Date;
    updateAt?: Date
 }

 const userSchema = new Schema<IUser>(
    // in this schema we are creating one object
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
    { timestamps: true }
 );

 // create one hook for password
 // if we modified the password this hook will run before saving the password 
 // and it this hook will encrypt the password as well.
 // We are using "pre" hook, it is use just before data has been process and save
 userSchema.pre("save", async function (next){
    // using "this" we ccan access all the variable mentioned above: email, password, etc.. 
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
 })

 const User = models?.User || model<IUser>("User", userSchema)

 export default User;