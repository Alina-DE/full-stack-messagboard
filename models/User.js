const { Schema, model } = require("mongoose");
const { generateRobohashAvatar } = require("../helpers/avatar")

// Creating User schema
const UserSchema = new Schema({

    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String },
    ip: { type: String },
    hash: { type: String, required: true },
    avatar: { type: String, default: generateRobohashAvatar() },
    dates: {
        registered: { type: Date, default: Date.now() },
        last_active: Date
    },
    messages: { type: Number }

});

const User = model("User", UserSchema);

module.exports = User;