const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, 8);
}

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}

let User = mongoose.model('users',userSchema);


module.exports = User;