const mongoose = require("mongoose")

const connectDB = async () =>{
    await mongoose.connect(
        "mongodb+srv://navneet:3X16ZwoyXVvOlQZq@namastenode.vdnel.mongodb.net/"
    )
}

module.exports =  connectDB;
