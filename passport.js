// set up Passport

const passport = require('passport')
const LocalStrategy = require('passport-local')
const {Patient, Data, DataSet, Threshold} = require('../DexTrack/models/patient')

// Updated serialize/deserialize functions
passport.serializeUser((user, done) => {
    done(undefined, user._id)
})

passport.deserializeUser((userId, done) => {
    Patient.findById(userId, { password: 0 }, (err, user) => {
        if (err) {
            return done(err, undefined)
        }
        return done(undefined, user)
    })
})

// Set up "local" strategy, i.e. authentication based on username/password. There are other types of strategy too.

var strategy = new LocalStrategy( (username, password, cb) => {
    // first, check if there is a user in the db with this username
    Patient.findOne({username: username}, {}, {}, (err, user) => {
        if (err) { return cb(null, false, { message: 'Unknown error.' }) }
        if (!user) { return cb(null, false, { message: 'Incorrect username.' }) }
    // if there is a user with this username, check if the password matches
    user.verifyPassword(password, (err, valid) => {
      if (err) {  return cb(null, false, { message: 'Unknown error.' }) }
      if (!valid) { return cb(null, false, { message: 'Incorrect password.' }) }
      return cb(null, user)
    })
  })
})

passport.use(strategy)

module.exports = passport