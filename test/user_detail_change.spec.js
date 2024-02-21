const db=require('../models/index')
const assert=require('assert')
const sinon = require('sinon'); 
const decode=require('../util/decode_jwt')
const {user_detail_change}=require('../operations/user_operation');
const { log } = require('console');

describe('Testing the user update suit', () => {
    
    it('Testing the user update with proper values', async () => {
        const stub=sinon.stub(decode,"decode_jwt");
        stub.returns({id:120});
        const req = { body: { name: "hari" }, params: { id: 120 } };
        const res = { json: (user) => user };
        const updateduser = await user_detail_change(req, res, () => null);
        const for_test=await db.sequelize.models.user.findOne({where:{id:120}})
        //assert.equal(updateduser,for_test)
        sinon.restore();
        assert.equal(JSON.stringify(updateduser.dataValues),JSON.stringify(for_test.dataValues));
    });

    it('user does not exist',async () => {
        const stub=sinon.stub(decode,"decode_jwt");
        stub.returns({id:300});
        const req = { body: { name: "hari" }, params: { id: 300 } };
        const res = { json: (user) => user };
        const updateduser = await user_detail_change(req, res, () => null);
        sinon.restore();
        console.log(updateduser);
    });

    it('user does not have permission',async () => {
        const stub=sinon.stub(decode,"decode_jwt");
        stub.returns({id:100});
        const req = { body: { name: "hari" }, params: { id: 300 } };
        const res = { json: (user) => user };
        const updateduser = await user_detail_change(req, res, () => null);
        console.log(updateduser);
    });
    
});
