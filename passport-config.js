const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("./models/User")

// Configuring passport

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
}

exports.JwtStrategy = new JwtStrategy(options, async (payload, done) => {

    try {
        const user = await User.findById(payload.id);

        if (user === null) {
            throw "User was not found"
        }

        done(null, user)

    } catch (error) {
        done(error, false)
    }
})