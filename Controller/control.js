const jwt=require('jsonwebtoken')
const decode=require('../util/decode_jwt')
const db=require('../models/index')
const user=require('../models/user');
const { Error } = require('sequelize');
const mailf=require('../worker/producer/mailQueue_adder');
const { use } = require('../Router/user');
const { createUser, verifyUser, loginUser ,refresh_token} = require('../operators/operations');

let count=0;

exports.Signup=async (req,res,next)=>{
    await createUser(req.body,res);
}

exports.verified=async (req,res,next)=>{
    await verifyUser(req,res,next);
}

exports.login=async (req,res,next)=>{
    await loginUser(req,res,next);
}

exports.refresh_token=(req,res,next)=>{
    refresh_token(req,res,next);
}


