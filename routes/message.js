const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    getAllMessages,
    getOneMessage,
    createMessage,
    editMessage,
    deleteMessage } = require("../controllers/messageControllers")


// GET all messages from requested Category
router.get("/view-all/:category", getAllMessages)

// GET one message by requested Message ID
router.get("/view-single-message/:message_id", getOneMessage)

// CREATE a new message
router.post("/create", createMessage)

// EDIT a current message
router.put("/edit", passport.authenticate("jwt", { session: false }), editMessage)

// "DELETE" a current message
router.put("/delete", passport.authenticate("jwt", { session: false }), deleteMessage)


module.exports = router;