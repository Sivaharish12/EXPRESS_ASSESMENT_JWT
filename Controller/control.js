let users=require('../data')
const jwt=require('jsonwebtoken')
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

exports.token_handle=(req,res,next)=>{
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



exports.user_detail=(req,res,next)=>{
    const auth_header=req.headers['authorization'];
    const access_token=auth_header.split(' ')[1];
    jwt.verify(access_token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) throw new Error("Unvlaid Access Token");
        const decoded_access_token=jwt.decode(access_token);
        const user_obj={id:decoded_access_token.id};
        const logged_user=users.find(user=>user.id===user_obj.id);
        if(logged_user==null) throw new Error("The User does not exist");
        res.send(logged_user);
    })
}



exports.user_detail_change=(req,res,next)=>{
    const update=req.body;
    console.log(update);
    const keys=Object.keys(update);
    const auth_header=req.headers['authorization'];
    const auth_token=auth_header && auth_header.split(' ')[1];
    const decode_auth_token=jwt.decode(auth_token);
    const logged_user={id:decode_auth_token.id}
    const user=users.find(user=>user.id===logged_user.id)
    if(user==null) throw new Error("User not found");
    for(let i=0;i<keys.length;i++){
        user[keys[i]]=(update[keys[i]]);
    }
    res.send(user);
}


exports.user_delete=(req,res,next)=>{
    const auth_header=req.headers['authorization'];
    const auth_token=auth_header.split(' ')[1];
    const logged_user=jwt.decode(auth_token);
    users=users.filter(user=>user.id!==logged_user.id);
    res.send(`The user object id:${logged_user.id} deleted sucessfully!`);
    console.log(users);
}