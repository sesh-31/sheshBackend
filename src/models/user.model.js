import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory:

            [{
                type: Array,
                ref: "Video"
            }],
        password: {
            type: String,
            required: [true, 'password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }


)

userSchema.pre("save", async function (next) {
    // Check if password is modified or new
    if (!this.isModified("password")) return next(); // If not, skip password hashing

    // Hash the password before saving
    this.password = await bcrypt.hash(this.password, 10);

    // Proceed with saving the document
    next();
})

userSchema.methods.isPasswordCorrect = async function
    (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = async function() {
  return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACESS_TOKEN_SECRET,{
            expiresIn: process.env.ACESS_TOKEN_EXPIRY
        }

    )
}
userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}


export const user = mongoose.model("User", userSchema)