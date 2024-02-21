const assert=require('assert')
const sinon = require('sinon'); // Import Sinon.js
const jwt = require('jsonwebtoken'); // Import the jwt library
const decode = require('../util/decode_jwt'); // Import your function
const {get_user_detail}=require('../operations/user_operation')
const db=require('../models/index');
const { log } = require('console');

describe('user_details', () => {
    it('valid_id',async  () => {
        const sandbox = sinon.createSandbox();
        const decode_jwt_stub = sandbox.stub(decode, 'decode_jwt');
        decode_jwt_stub.returns({id:100});
        const res={json:user=>user}
        const req = {};
        await get_user_detail(req,res, () => null)
        sandbox.restore();
    });
    it('Invalid user',async () => {
        console.log("________________________________________________________");
        const sandbox = sinon.createSandbox();
        const decode_jwt_stub = sandbox.stub(decode, 'decode_jwt');
        decode_jwt_stub.throws(new Error('dummy error'))
        const res={json:user=>user}
        const req = {};
        await get_user_detail(req,res, () => null)
        sandbox.restore();
    });
    
});