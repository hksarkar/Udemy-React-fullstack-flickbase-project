const express = require('express'); 
const app = express(); 
const mongoose  = require('mongoose'); 
const bodyParser = require('body-parser');

const Users = require('./routes/api/users');
const {checkToken} = require('./middleware/auth');

require('dotenv').config()


const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}retryWrites=true&w=majority`;
mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})


app.use(bodyParser.json())
app.use(checkToken);
app.use('/api/users/',Users);


const port = process.env.PORT || 3002;

app.listen(port,()=>{
 console.log(`Server is running on:${port}`);
})