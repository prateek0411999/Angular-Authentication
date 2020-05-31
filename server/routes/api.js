const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const jwt =require('jsonwebtoken');

const User=require('../models/user')

const db="mongodb://localhost/eventsdb";
mongoose.connect(db,(err)=>{
    if(err){
        console.error('Error!'+ err)
    }else{
        console.log('connected to mongoDB')
    }
});
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

router.get('/',(req,res)=>{
    res.send('from API route')
})


router.post('/register',(req,res)=>{
    let userData= req.body;
    let user =new User(userData);
    user.save((error, registeredUser)=>{
        if(error){
            console.log(error);
        }else{
            //create a payload- it's an object and will contain the userid
            let payload = {subject: registeredUser._id}
           //now let's sign a token and generate it
           let token = jwt.sign(payload, 'secretKey')
           //send this token as an object 
            res.status(200).send({token}) //token as an object
        }
    })


})

router.post('/login',(req,res)=>{
    let userData= req.body
    User.findOne({email: userData.email},(error,user)=>{
        if(error){
            console.log(error);

        }
        else{
            if(!user){
                res.status(401).send('invalid email')
            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid password')
                }else{
                    let payload= {subject: user._id}
                    let token =jwt.sign(payload, 'secretKey')
                    res.status(200).send({token});
                }
            }
        }
    })
})


router.get('/events',(req,res)=>{

    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]

      res.json(events)
})
router.get('/special',verifyToken,(req,res)=>{
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]

      res.json(events)

})



module.exports =router;
