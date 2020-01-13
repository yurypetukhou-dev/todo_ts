const {Schema, model, Types} = require('mongoose')
const crypto = require('crypto')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String
    },
    salt: String,
    notes: [{type: Types.ObjectId, ref: 'User'}]
})

User.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hashPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 212, 'sha512').toString('hex')
}

User.methods.checkPassword = function(password){
    const codedPass = crypto.pbkdf2Sync(password, this.salt, 10000, 212, 'sha512').toString('hex')
    return this.hashPassword === codedPass;
}

User.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);7
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
    }, config.get("jwtSecret"));
};

module.exports = model('User', User)