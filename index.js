const express = require("express");

const cors = require("cors");

const authRotes = require("./routes/auth");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.status(200).send('server is up and running');
})

app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
})

