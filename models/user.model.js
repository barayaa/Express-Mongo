const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require ('bcrypt');


const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type : String,
            minlength : 3,
            maxlength : 55,
            unique : true,
            trim : true
        }, 
        email : {
            type: String,
            required : true,
            unique: true,
            validate : [isEmail],
            lowercase : true,
            trim : true
        },
        password : {
            type: String,
            required : true,
            max: 1024,
            minlength: 6,
        },
        picture: {
            type: String
        },
        bio : {
            type: String
        },
        followers : {
            type: [String]
        },
        following : {
            type: [String]
        },
        likes : {
            type: [String]
        },
    },
    {
        timestamps : true
    }
);

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel