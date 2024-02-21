const jwt=require('jsonwebtoken')
const decode=require('../util/decode_jwt')
const db=require('../models/index')
const user=require('../models/user');
const { Error } = require('sequelize');
require('dotenv').config();

async function signup(req, res, next) {
    const { name, password, confirm_password, number } = req.body;
    try {
        const user = await db.sequelize.models.user.create({ name, password, confirm_password, number });
        return res.json(user); // Return the plain data using dataValues
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
}



async function login(req,res,next){
    const user=await db.sequelize.models.user.findOne({where :{name:req.body.name}});
    if(user==null) throw new Error("The user is empty");
    const user_obj_sign={id:user.id}
    if(user.password===req.body.password){
        const refresh_tocken=jwt.sign(user_obj_sign,process.env.REFRESH_TOKEN_SECRET);
        const access_token=jwt.sign(user_obj_sign,process.env.ACCESS_TOKEN_SECRET,{expiresIn : '30m'});
        console.log({access_token:access_token,refresh_tocken:refresh_tocken});
        console.log(user.id);
        res.json({access_token:access_token,refresh_tocken:refresh_tocken});
    }
    else{
        next( new Error("Password Mismatch"));
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


async function get_user_detail(req,res,next){
    try{
        const decoded_access_token = decode.decode_jwt(req, res, next);
        const pk=decoded_access_token.id;
        const user=await db.sequelize.models.user.findByPk(pk);
        res.json(user);
    }
    catch(err){
        next(new Error(err));
    }
}


async function user_detail_change(req,res,next){
    const verify_token=decode.decode_jwt(req, res, next);
    const pk=req.params.id;
    if(verify_token.id==pk){
        const update=req.body;
        const keys=Object.keys(update)
        const user=await db.sequelize.models.user.findByPk(pk);
        console.log("$$$$$$$$$$$$$$$$$$$$$",user);
        if(user==null) next(new Error("User not found"));
        try{
            keys.forEach(key => {
                user[key]=update[key];
                user.save();
                console.log(key);
            });

        }
        catch(err){
            console.error(err);
        }
    return res.json(user);
    }
    else{
        next(new Error("The user does not have permission to update the record"));
    }
}

async function user_delete(verify_token_id,delete_id){
    const user=await db.sequelize.models.user.findByPk(delete_id);
    if(user && user.id==verify_token_id){
        await user.destroy();
        return delete_id;
    }
    else if(user) {
        return 1;
    } 
    else 
    {
        return 0;
    }

}


module.exports={signup,login,refresh_token,get_user_detail,user_detail_change,user_delete}