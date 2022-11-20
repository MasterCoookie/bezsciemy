const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        //todo: extend model
        username:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        }
    }
)

userSchema.statics.login = async function (_username, _password)
{
    const user = await this.findOne({username : _username});
    if (user)
    {
        //todo: add bcrypt
        //console.log(user)
        console.log(user.password)
        console.log(_password)
        if (user.password === _password)
        {
            return user;
        }
        throw Error("Incorrect password")
    }
    else
    {
        throw Error("Invalid username")
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;