const mongoose=require('mongoose');
const validator=require('validator');
const bcryptjs=require('bcryptjs');
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Use must contain name'],
        min:[3,'name should contain atleast 3 character'],
        max:30,
    },
    email:{
        type:String,
        required:[true,'User must contain email'],
        unique:[true,"email is alredy exist please user another"],
        validate:[validator.isEmail,'please provide valid email'],
    },
    password:{
        type:String,
        required:[true,'User must contain password'],
        min:8,
        select:false
    },
    date:{
        type:Date,
        default:Date.now
    }
})

// encrytping password using bcryptjs 
UserSchema.pre('save', async function(next){
    console.log("hey");
    if(!this.isModified('password')) next();

    this.password=await bcryptjs.hash(this.password,12);
    next();
})

UserSchema.methods.comparePassword=async function(candidatePassword,Userpassword){
    return await bcryptjs.compare(candidatePassword,Userpassword);
}
const User=mongoose.model('User',UserSchema);
// User.createIndexes();
module.exports=User;