const bodyParser = require('body-parser');

const express = require('express');
const path = require('path');
const fs = require('fs');

const cors  = require('cors');
require('dotenv').config();



const port = process.env.PORT || 3001;
const app = express();


app.use(express.static(__dirname+'/'));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({limit: "10000kb", extended: true }));
app.use(express.json());
app.use(cors())



app.use(`/api`, require('./route/chat'));
// app.use(`/${apikey}/api/email`, require('./routes/mail'));


app.get('/', (req, res) => {
    res.status(200).json({msg:" Server Connected " })
});

app.listen(port, () => {
    console.log(`server listen at port ${port}`);
});