import mongoose from "mongoose";
export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "mern_rent"
    }).then(c => console.log(`DB connected to ${c.connection.host}`)).catch((e) => console.log(e));
};
