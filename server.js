const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

// for heroku deployment
const path = require('path');

const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");

// Importing passport
const passport = require("passport");
const { JwtStrategy } = require("./passport-config");

// assigning port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
passport.use(JwtStrategy)

// Routes
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

// for heroku deployment
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

console.log("Connecting to database. Put the kettle on while you wait... 🫖");


mongoose
  .connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
  )
  .then(() => console.log("Database connected! 😍☕"))
  .catch((error) => console.log(error, "Database did not connect! ☹️❌"));


app.listen(PORT, () => console.log(`The server is running on port: ${PORT}...🎧`));