const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const {OAuth2Client} = require('google-auth-library')

async function getUserData(access_token){
    console.log('GETUSERDATA Function')
    console.log('Access Token = ', access_token)
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json()
    console.log('Fetched Data = ', data)
    // add error handling for production
}

router.get('/', async function (req, res, next){
    const code = req.query.code
    console.log('Google Code: ', code)
    try{
        const redirectURL = 'http://localhost:4000/oauth2callback'
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_SECRET,
            redirectURL
        )
        const r =  await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        const user = oAuth2Client.credentials;
        console.log('credentials',user);
        await getUserData(oAuth2Client.credentials.access_token);
    }catch(err){
        console.log('Error signing into Google', err)
    }
})

module.exports = router;