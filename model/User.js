const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    id : {type : String, required : true, unique : true},
    email : {type : String, required : true},
    password : {type : String, required : true}
}, {
    timestamps : true
});

let User = mongoose.model('users',userSchema);


module.exports = User;