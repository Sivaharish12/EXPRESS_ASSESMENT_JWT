const assert = require('assert');
const {signup,login} = require('../operations/user_operation'); 

describe('login', () => {
    it('Test if the particular user is present in the database or not', async () => {
        const userData = {
            name: 'John Doe',
            password: 'password123',
        };

        const req = { body: userData };
        const res = { json: user => user };

        try{
            const loggeduser=await login(req,res);
            assert.notStrictEqual(loggeduser, null, 'User should exist in the database');
        }
        catch(err){
            console.log(err);
            assert.fail(`Unregistered User : ${userData.name} is not found in the registry`);   //if the user is not in the DB does not have the access to login.
        }
       
    });
    
    it('Password mismatch', async () => {
        const userData = {
            name: 'John Doe',
            password: 'password123vdisgogw8wr',
        };

        const req = { body: userData };
        const res = { json: user => user };
        try{
            const loggeduser=login(req,res);
            assert.fail("The user credentials are wrong!")
        }
        catch(err){
            console.log(err);
        }
    });

    it('User is not present',async () => {
        const user_details={
            name:"name_which_does_not_exists_in_DB",
            passowrd:"test"
        };
        const req={body:user_details}
        const res={json:res=>res}
        try{
            const loggeduser=login(req,res);
        }
        catch(err){
            console.log(err);
        }
    });
    
    
});