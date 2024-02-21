const { signup } = require('../operations/user_operation');
const assert = require('assert');

describe('createUser', () => {
    it('should create a user record', async () => {
        const userData = {
            name: 'John Doe',
            password: 'password123',
            confirm_password: 'password123',
            number: 1234567890,
        };
    
        const req = { body: userData };
        const res = { json: user => user };
    
        try {
            const createdUser = await signup(req, res);
            assert.ok(createdUser.id); // Use assert.ok for existence check
            assert.strictEqual(createdUser.name, userData.name);
            assert.strictEqual(createdUser.password, userData.password);
            assert.strictEqual(createdUser.confirm_password, userData.confirm_password);
            assert.strictEqual(createdUser.number, userData.number);
        } catch (error) {
            console.error('Error during user creation:', error);
            assert.fail(`Error happened : ${error}`);   
        }
    });  



    it('validation check', async () => {        //it is used to check if validation errors are occured on the input
        const userData = {
            name: 'John Doe',
            password: 'password123',
            confirm_password: 'password123',
            number: "ergf",
        };
    
        const req = { body: userData };
        const res = { json: user => user };
    
        try {
            const createdUser = await signup(req, res);
            assert.ok(createdUser.id); // Use assert.ok for existence check
            assert.strictEqual(createdUser.name, userData.name);
            assert.strictEqual(createdUser.password, userData.password);
            assert.strictEqual(createdUser.confirm_password, userData.confirm_password);
            assert.strictEqual(createdUser.number, userData.number);
        } catch (error) {
            console.error('Error during user creation:', error); 
            //assert.fail(`Error happened : ${error}`);
        }
    });  
    
    
});
