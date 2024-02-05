let users=require('../data')
const jwt=require('jsonwebtoken')
const decode=require('../util/decode_jwt')

let count=0;

exports.Signup=(req,res,next)=>{
    const user=req.body;
    count+=1
    user.id=count
    users.push(user);
    res.send(users);
}

exports.login=(req,res,next)=>{
    const user=users.find(user=>user.name===req.body.name);
    if(user==null) throw new Error("The user is empty");
    const user_obj_sign={id:user.id}
    if(user.password===req.body.password){
        const refresh_tocken=jwt.sign(user_obj_sign,process.env.REFRESH_TOKEN_SECRET);
        const access_token=jwt.sign(user_obj_sign,process.env.ACCESS_TOKEN_SECRET,{expiresIn : '30m'});
        console.log(user);
        res.json({access_token:access_token,refresh_tocken:refresh_tocken});
    }
    else throw new Error("Password Mismatch");
}

exports.refresh_token=(req,res,next)=>{
    const token=req.body.token;
    console.log(token);
    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        console.log(user);
        if(err) throw new Error("The verification failed");
        const access_token=jwt.sign({id:user.id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30m"});
        const decoded_access_token=jwt.decode(access_token);
        const expirationDate = new Date(decoded_access_token.exp * 1000);
        res.send({ access_token, expirationDate });
    });

}



exports.user_detail = (req, res, next) => {
    const decoded_access_token = decode.decode_jwt(req, res, next);
    const user_obj = { id: decoded_access_token.id };
    const logged_user = users.find(user => user.id === user_obj.id);
    res.send(logged_user);
};




exports.user_detail_change=(req,res,next)=>{
    const update=req.body;
    const keys=Object.keys(update);
    const logged_user=req.params.id;
    const user=users.find(user=>user.id==logged_user);
    if(user==null) throw new Error("User not found");
    for(let i=0;i<keys.length;i++){
        user[keys[i]]=(update[keys[i]]);
    }
    res.send(user);
}


exports.user_delete=(req,res,next)=>{
    const delete_id=req.params.id;
    users=users.filter(user=>user.id!=delete_id);
    res.send(`The user object id:${delete_id} deleted sucessfully!`);
    console.log(users);
}