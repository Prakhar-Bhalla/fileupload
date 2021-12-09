const mongoose = require("mongoose");

require("dotenv").config({path: "./.env"});

const connect = () => {
    return mongoose.connect(`mongodb+srv://Prakhar2266:${process.env.MONGO_PASSWORD}@cluster0.pvv3v.mongodb.net/userimages`)
}

module.exports = connect;