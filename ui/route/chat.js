const express = require('express')
route = express.Router();

route.post('/chat', async(req,res)=>{
    var msg = req.body.question;
    console.log(msg);
    res.status(200).json({'msg': "answer"})
})

module.exports = route
