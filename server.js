const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register= require('./controllers/register')
const signin= require('./controllers/signin')
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'rahul499',
      database : 'facio'
   }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {
    res.send('It is working!');
})
app.post('/signin',  (req, res) => { 
    signin.handleSignIn(req, res, db, bcrypt) 
})
app.post('/register', (req, res) => { 
    register.handleRegister(req, res, db, bcrypt) 
})
app.get('/profile/:id', (req, res) => { 
    profile.handleProfile(req, res, db) 
})
app.put('/image', (req, res) => { 
    image.handleImage(req, res, db) 
})
app.post('/imageurl', (req, res) => { 
    image.handleApiCall(req, res) 
})

var port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
