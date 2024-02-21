const assert=require('assert')
const {user_delete}=require('../operations/user_operation');
describe('Deleting User Test Suit', () => {
    it('proper user id with same user jwt token',async () => {
        const verify_token_id=76,delete_id=76;
        const result=await user_delete(verify_token_id,delete_id);
        assert.equal(result,verify_token_id);
    });

    it('Proper id with the diffrent user jwt token',async () => {
        const verify_token_id=43,delete_id=90;
        const result=await user_delete(verify_token_id,delete_id);
        assert.equal(result,1);
    });
    
    it('id associated with no user',async () => {
        const verify_token_id=300,delete_id=32;
        const result=await user_delete(verify_token_id,delete_id);
        assert.equal(result,0);
    });
    
    
});
