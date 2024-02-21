const{refresh_token}=require('../operations/user_operation')
const assert=require('assert')
const sinon = require('sinon'); // Import Sinon.js
const jwt = require('jsonwebtoken');


describe('Testing the refresh_Token', () => {
    it('Proper Refresh Token', async() => {
        const token={
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImlhdCI6MTcwODQyMDk1M30.879Tw7toEX_unO6Da2v8xxK2nQzuRdBfBuYqOqmdrqg"
        };
        const req={body:token}
        const res={send:sinon.stub()}; //mock the response method

         const verifyStub = sinon.stub(jwt, 'verify');  //stub the verify method to check the validation
         verifyStub.returns({ id: 64 });    //64-user_id

        refresh_token(req, res);
        assert.equal(res.send.calledOnce,true);  // Verify that res.send was called
        verifyStub.restore();  // Restore the original jwt.verify method
        
    });

    it('Tampered Refresh Token', async () => {
        const req = { body: { token: "eyJhbGciOiJIUzI1NiIsInR5cCIkpXVCJ9.eyJpZCI6NjQsImCI6MTcwODQyMDk1M30.879Tw7toEX_unO6Da2v8xQzuRdBfBuYqOqmdrqg" } };
        const res = { send: sinon.stub() };
        const verifyStub = sinon.stub(jwt, 'decode'); // Stub the decode method to return null
        verifyStub.returns(null); // Simulate token tampering or invalid token
        try {
            refresh_token(req, res);
        } catch (error) {
            console.error('Error caught during test:', error);
            assert.equal(error.message, "The Token is tampered");
        }
    });
    
});
