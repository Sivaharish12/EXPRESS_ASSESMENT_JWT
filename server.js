const express=require('express');
const app=express();
const db=require('./models/index');
const user = require('./models/user');
app.use(express.json());

app.post('/signup',async (req,res,next)=>{
    const {name,email,password}=req.body;
    try{
        const user=await db.sequelize.models.user.create({name,email,password});
        res.json(user)
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
})

app.put('/user-update/:id',async (req,res,next)=>{
    const pk=req.params.id;
    const update=req.body;
    const keys=Object.keys(update)
    const user=await db.sequelize.models.user.findByPk(pk);
    res.send(update)
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
})

app.get('/:id',async (req,res,next)=>{
    const pk=req.params.id;
    const user=await db.sequelize.models.user.findByPk(pk);
    res.json(user);
})

app.delete('/delete/:id',async (req,res,next)=>{
    const pk=req.params.id;
    const user=await db.sequelize.models.user.findByPk(pk);
    await user.destroy();
    res.send(`The user id:${pk} data deleted succesfully.`)
})
app.listen(5000);