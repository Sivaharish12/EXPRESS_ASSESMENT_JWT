require('dotenv').config()
const express=require('express')
const app=express()
const router=require('./Router/route');
const { errors } = require('celebrate');


app.use(express.json());
app.use('/',router);
app.use(errors());
app.use('/',(err,req,res,next)=>{
    if (err.name === 'CelebrationError') {
        return res.status(400).send(err.validation.message);
    }
})



app.listen(5000);