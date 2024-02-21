const decode=require('../util/decode_jwt')
const db=require('../models/index')
const { Error } = require('sequelize');
const { user_detail, user_detail_change, user_delete } = require('../operators/user_operations');



exports.user_detail = async (req, res, next) => {
    user_detail(req,res,next);
};


exports.user_detail_change=async (req,res,next)=>{
   user_detail_change(req,res,next);
}


exports.user_delete=async (req,res,next)=>{
   user_delete(req,res,next);
}


