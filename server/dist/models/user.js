import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
    //since we will use firebase auth so id is required, as mongo has different id
    _id: {
        type: String,
        required: [true, "Please enter Id"],
    },
    name: {
        type: String,
        required: [true, "Please enter Name"],
    },
    email: {
        type: String,
        required: [true, "Please enter Email"],
        unique: [true, "Email already exist"],
        validate: validator.default.isEmail,
    },
    photo: {
        type: String,
        required: [true, "Please add Photo"],
    },
    role: {
        type: String,
        required: ["admin", "user"],
        default: "user",
    },
    dob: {
        type: Date,
        required: [true, "Please enter DOB"],
    },
}, { timestamps: true, });
schema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() || today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate()) {
        age--;
    }
    return age;
});
export const User = mongoose.model("User", schema);
