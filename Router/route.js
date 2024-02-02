const express=require('express');
const route=express.Router();
const Controller=require('../Controller/control');
const Inp_Validator=require('../Controller/validation');

route.post('/signup',Inp_Validator.signup_validation,Controller.Signup);
route.post('/login',Inp_Validator.login_validation,Controller.login);
route.post('/token',Inp_Validator.token_validation,Controller.token_handle);
route.post('/user-detail',Inp_Validator.token_header_validation,Controller.user_detail);
route.put('/user-update',Inp_Validator.token_header_validation,Inp_Validator.user_update_validation,Controller.user_detail_change);
route.delete('/user-delete',Inp_Validator.token_header_validation,Controller.user_delete);

module.exports=route;