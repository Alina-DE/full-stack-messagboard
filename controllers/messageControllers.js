const Message = require("../models/Message");
const User = require("../models/User")


// Getting all messages in a category:
exports.getAllMessages = async (req, res) => {

    try {
        const messages = await Message.find({ category: req.params.category, deleted: false })
            .populate("user_id")
            .sort({ "_id": -1 })  // the newest messages on top
            .limit(20)

        res.status(200).send(messages)

    } catch (error) {
        res.status(500).json({ "message": "Error occurred", "error": error })
    }
}

// Get one message by ID
exports.getOneMessage = async (req, res) => {

    try {
        const foundMessage = await Message.findOne({ _id: req.params.message_id, deleted: false })
            .populate("user_id")

        if (foundMessage === null) {
            return res.status(404).send(`The message with id: ${req.params.message_id} was not found`)
        }

        res.status(200).send(foundMessage)

    } catch (error) {
        res.status(500).json({ "message": "Error occurred", "error": error })
    }
}

// Create a new message
exports.createMessage = async (req, res) => {

    try {
        const { user_id, content, category } = req.body;

        const checkUserId = await User.findById(user_id)

        if (!checkUserId) {
            return res.send("No user with this ID found")
        }

        // creating a new message from Message model
        const createdMessage = await Message.create({
            user_id,
            content,
            category: category.toLowerCase()
        })

        res.status(200).json({ message: "Message was created", createdMessage: createdMessage })

    } catch (error) {
        res.status(400).send({ message: "Error occurred", error: error })
    }
}

// Edit a message
exports.editMessage = async (req, res) => {

    try {
        const { user_id, message_id, content } = req.body;

        // Checking if the logged-in user is the same as the one trying to edit the message:
        if (user_id != req.user._id) {
            return res.status(401).json({ message: "User is not authorized to perform this action, please login first" })
        }

        // Finding the message (should not be deleted - we can not edit the deleted message)
        const checkMessageId = await Message.findOne({ _id: message_id, deleted: false })

        if (!checkMessageId) {
            return res.status(404).json({ message: "No message with this ID found" })
        }

        if (checkMessageId.user_id != user_id) {
            return res.status(401).json({ message: "User is not authorized to edit this message" })
        }

        // editing a current message
        const updatedMessage = await Message.findByIdAndUpdate(message_id, {
            user_id,
            message_id,
            content,
        }, { new: true })

        res.status(200).json({ message: "Message was updated", updatedMessage: updatedMessage })

    } catch (error) {
        res.status(400).send({ message: "Error occurred", error: error })
    }
}

// Delete a message
exports.deleteMessage = async (req, res) => {

    try {
        const { user_id, message_id } = req.body;

        // Checking if the logged-in user is the same as the one trying to delete the message:
        if (user_id != req.user._id) {
            return res.status(401).json({ message: "User is not authorized to perform this action, please login first" })
        }

        // Finding the message (not already deleted - we can not delete twice)
        const checkMessageId = await Message.findOne({ _id: message_id, deleted: false })

        if (!checkMessageId) {
            return res.status(404).json({ message: "No message with this ID found" })
        }

        // Checking if the logged-in user has the right to delete this message:
        if (checkMessageId.user_id != user_id) {
            return res.status(401).json({ message: "User is not authorized to delete this message" })
        }

        //editing a current message - changing "deleted: true"
        const deletedMessage = await Message.findByIdAndUpdate(message_id, {
            user_id,
            message_id,
            deleted: true
        }, { new: true })

        res.status(200).json({ message: "Message was deleted", deletedMessage: deletedMessage })

    } catch (error) {
        res.status(400).send({ message: "Error occurred", error: error })
    }
}