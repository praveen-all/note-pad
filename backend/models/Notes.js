const mongoose=require('mongoose');
const NoteSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'notes must know who is writting']
    }
    ,
    title:{
        type:String,
        required:[true, " Note pad must required a title"],

    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Notes=mongoose.model('Notes',NoteSchema);
module.exports=Notes;