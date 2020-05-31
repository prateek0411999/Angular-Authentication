const express = require('express');
const bodyParser= require('body-parser');
const cors =require('cors');
//cors is responsible to take care of the ports as
//we are running our angular application on port 4200
//and server on 3000
//for that we need to use cors 
const PORT=3000;
const app=express();
const api=require('./routes/api');
app.use(cors());
app.use(bodyParser.json())
app.use('/api',api);

app.get('/',(req,res)=>{
    res.send('Hello from server')
})

app.listen(PORT, ()=>{
    console.log('server running on localhost'+ PORT);

})