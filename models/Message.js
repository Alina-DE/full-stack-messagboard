const { Schema, model } = require("mongoose");

// Creating Message schema
const MessageSchema = new Schema({

    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    dates: {
        created: { type: Date, default: Date.now() },
        last_edited: Date
    },
    category: { type: String, enum: ["question", "suggestion", "feedback"] },
    deleted: { type: Boolean, default: false }

});

const Message = model("Message", MessageSchema);

module.exports = Message;