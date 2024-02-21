const jwt=require('jsonwebtoken')
const decode=require('../util/decode_jwt')
const db=require('../models/index')
const user=require('../models/user');
const { Error } = require('sequelize');
const {signup,login,refresh_token,user_detail,user_detail_change,user_delete}=require('../operations/user_operation')

let count=0;

exports.Signup=async (req,res,next)=>{
   signup(req,res,next);
}

exports.login=async (req,res,next)=>{
   login(req,res,next);
}

exports.refresh_token=(req,res,next)=>{
   refresh_token(req,res,next);
}



exports.user_detail = async (req, res, next) => {
    user_detail(req,res,next);
};




exports.user_detail_change=async (req,res,next)=>{
    user_detail_change(req,res,next);
}


exports.user_delete=async (req,res,next)=>{
   console.log("#########################");
   if(res.locals.id){
      const verify_token=res.locals.id;
      const user_id=req.params.id;
      const result=await user_delete(verify_token,user_id);
      // console.log(`result is ${result} and the user_id is${user_id}`);
      if(result==user_id) res.send(`The user id:${delete_id} data deleted succesfully.`);
      else if(result==1)  next(new Error("Does not have permission"));
      else next(new Error("User not exist"));
   }
   else next(new Error("Token is Tampered"));   
}