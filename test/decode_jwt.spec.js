const assert = require('assert');
const jwt = require('jsonwebtoken');
const decodeJwt = require('../util/decode_jwt'); // Replace with the actual path

describe('decode_jwt middleware', () => {
    it('should decode a valid JWT and set res.locals.id', () => {
        const validToken = jwt.sign({ id: 64 }, 'be1493d17ff259f6d234defdaedf1f2e40458fd61072b16f5f4255b989deb70edfad48d443e98b8eb3b7baaa902a90ea031f32fa9097ddb35be9eb45848e3df6');
        const req = {
            headers: {
                authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImlhdCI6MTcwODQ5MjUxMywiZXhwIjoxNzA4NDk0MzEzfQ.lUkuvuPATcs_jMIebh2rMg-WHlbVd5YqjoTGy6HwnQ8"}`,
            },
        };
        const res = {
            locals: {},
        };

        decodeJwt.decode_jwt(req, res, () => {});

        assert.strictEqual(res.locals.id, 64);
    });

    it('should set res.locals.id to null for an invalid JWT', () => {
        const invalidToken = 'invalid-token';
        const req = {
            headers: {
                authorization: `Bearer ${"svohvoidfvgifvo9iwhp9wh9e0hfo8ievewbe98fb289gf80egfgubcduidcwu"}`,
            },
        };
        const res = {
            locals: {},
        };

        decodeJwt.decode_jwt(req, res, () => {});

        assert.strictEqual(res.locals.id, null);
    });

});
