console.log('user.js is working')

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    passwordDigest: String
});

// create a new user with secure (hashed) password
UserSchema.statics.createSecure = function (email, password, callback) {
    // `this` references our user model, since this function will be called from the model itself
    // store it in variable `UserModel` because `this` changes context in nested callbacks

    var UserModel = this;

    // hash password user enters at sign up
    bcrypt.genSalt(function (err, salt) {
        console.log('salt: ', salt);  // changes every time
        bcrypt.hash(password, salt, function (err, hash) {

            // create the new user (save to db) with hashed password
            UserModel.create({
                email: email,
                passwordDigest: hash
            }, callback);
        });
    });
};
// define user model
var User = mongoose.model('User', UserSchema);


// compare password user enters with hashed password (`passwordDigest`)
UserSchema.methods.checkPassword = function (password) {
    // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
    return bcrypt.compareSync(password, this.passwordDigest);
};


// export user model
module.exports = User;