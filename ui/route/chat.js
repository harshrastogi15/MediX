const express = require('express')
route = express.Router();

route.post('/chat', async(req,res)=>{
    res.status(200).json({'msg': "answer"})
})

module.exports = route