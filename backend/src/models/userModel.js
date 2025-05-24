const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: String,
        username: {
            type: String,
            required: true,
        },
        password:{
            type:String,
            required:true
        },
        role: {
            type: String,
            required: true,
            enum: ["candidate", "admin"],
            default: "candidate"
        },
    }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
};