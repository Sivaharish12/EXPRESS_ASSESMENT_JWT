const db = require('../models/index');
const mailf = require('../worker/producer/mailQueue_adder');
const jwt=require('jsonwebtoken')
const decode=require('../util/decode_jwt')
const user=require('../models/user');

async function createUser(userData,res) {
    const {name,password,confirm_password,number,mail}=userData;
    try{
        const user=await db.sequelize.models.user.create({name,password,confirm_password,number,mail});
        res.json(user)
        mailf(user.mail);
        console.log(user.mail);
        console.log("success!");
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}

async function verifyUser(req,res,next) {
    const mail=req.params.mail;
    const user=await db.sequelize.models.user.findOne({where:{mail:mail}});
    if(user==null) next(new Error("User not found"));
    user.verified=true;
    user.save();
    res.send("Verified!");
}

async function loginUser(req, res,next) {
    console.log("LOGIN!");
    const mail=req.body.mail;
    const user=await db.sequelize.models.user.findOne({where :{mail:mail}});
    if(user==null) throw new Error("The user is empty");
    const user_obj_sign={id:user.id}
    console.log(user.verified);
    if(user.password===req.body.password){ //&& user.verified){
            const refresh_tocken=jwt.sign(user_obj_sign,process.env.REFRESH_TOKEN_SECRET);
            const access_token=jwt.sign(user_obj_sign,process.env.ACCESS_TOKEN_SECRET,{expiresIn : '30m'});
            res.json({access_token:access_token,refresh_tocken:refresh_tocken});
        
    }
    else{
        next( new Error(`Password Mismatch ${user.verified}`));
    }
}

async function refresh_token(req,res,next){
    const token=req.body.token;
    const verify_token=jwt.decode(token);
    console.log(verify_token);
    if(verify_token){
        const access_token=jwt.sign({id:verify_token.id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30m"});
        const decoded_access_token=jwt.decode(access_token);
        const expirationDate = new Date(decoded_access_token.exp * 1000);
        res.send({ access_token, expirationDate });
    }
    else {
    throw new Error("The Token is tampered");
    }
}



module.exports = { createUser, verifyUser, loginUser , refresh_token };
