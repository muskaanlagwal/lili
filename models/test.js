var mongoose=require('mongoose');
const Schema=mongoose.Schema;

let user=new Schema({
Name:{
    type:String
},
email:{
    type:String
},
phone: {
    type:Number
   }
},
);
module.exports=mongoose.model('User',user);