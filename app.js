const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to api'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {

    const token = req.token;

    jwt.verify(token, config.secretKey, (err, authData) => {
        if (err) {
            res.status(403);
            res.send({ error: 'unauthorized access' });
        }
        const user = authData.user; // get the token back
        res.json({
            message: "Post created...",
            user
        })
    });
});

app.get('/api/login', (req, res) => {
    const payload = {
        subject: "tribe"
    };
    const secretKey = config.secretKey;
    const encryptionAlgorithm = config.algorithm;
    const expireTime = config.expireTime;
    const options = {
        algorithm: encryptionAlgorithm,
        expiresIn: expireTime
    }
    //sign takes payload and secret key to generate token
    jwt.sign(payload, secretKey, options, (err, token) => {
        res.send({ token });
    });

});

app.post('/api/login', (req, res) => {

    // const payloadUser = req.body.user;
    // const defaulUser = {
    //     id: 1,
    //     username: 'shivam kr singh',
    //     email: 'shivam@lavainternational.in'
    // };
    // const user = payloadUser || defaultUser;

    const payload = {
        subject: "tribe"
    };
    const secretKey = config.secretKey;
    const encryptionAlgorithm = config.algorithm;
    const expireTime = config.expireTime;
    const options = {
        algorithm: encryptionAlgorithm,
        expiresIn: expireTime
    }
    //sign takes payload and secret key to generate token
    jwt.sign(payload, secretKey, options, (err, token) => {
        res.send({ token });
    });

});

// Token format in header 
// authorization: Bearer <access_token>


function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

app.listen(port, () => {
    console.log('We are live on ' + port);
});
