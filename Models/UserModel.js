const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
    {
        name:{
            type:String,
            required: true,
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:['Admin','User'],
            required:true,
            default:'User'
        }
    },
    {
        timestamps:true
    }
);

module.exports = model('user', UserSchema);
