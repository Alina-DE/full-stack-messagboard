const User = require("../models/User")
const bcrypt = require("bcrypt")
const { generateToken } = require("../helpers/jwtIssuer")

// Register a new user
exports.registerUser = async (req, res) => {

    try {
        const { username, firstname, lastname, password } = req.body;

        const checkUser = await User.findOne({ username })

        if (checkUser) {
            return res.status(400).send("User with this username already exists in our Database")
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating a new user from User model
        const createdUser = await User.create({
            username,
            firstname,
            lastname,
            hash: hashedPassword,
            ip: req.ip
        })

        res.status(200).json({ message: "User was created", createdUser: createdUser })

    } catch (error) {
        res.status(400).send({ message: "Error occurred", error: error })
    }
}

// Login a user
exports.loginUser = async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })

        if (user === null) {
            return res.status(404).send(`User "${username}" was not found`)
        }

        // comparing passwords
        const checkPassword = await bcrypt.compare(password, user.hash)

        if (!checkPassword) {
            return res.status(401).send("Passwords do not match! Try again!")
        }

        const token = await generateToken(user);

        res.status(200).json({ "success": true, "message": "Passwords match, you are logged in", "token": token, "user": user })

    } catch (error) {
        res.status(500).json({ "message": "Error occurred", "error": error })
    }
};