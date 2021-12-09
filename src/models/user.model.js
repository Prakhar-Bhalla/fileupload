const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    first_name : {type: String, required: true},
    last_name : {type: String, required: false},
    profile_pic : {type: String, required: true}
}, {versionKey: false, timestamps: true});

const User = model("user", userSchema);

module.exports = User;