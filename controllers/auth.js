const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

const temporaryData = [
    { name:"kiriti", email:"kiriti@email",  password:"1234",}, 
    { name:"sankar", email:"sankar@email",  password:"1234",},
    { name:"naveen", email:"naveen@email",  password:"1234",},
    { name:"chintu", email:"chintu@email",  password:"1234",},
    { name:"harshal", email:"hrashal@email",  password:"1234",}


]


exports.signUp = (req,res)=>{
    //to do
    // {
    //     name:"kim";
    //     email:"kim@email";
    //     password:"1234";
    // }
    const {name,email,password} = req.body;
    const isValid =temporaryData.findIndex((ele)=>{
        ele.email===email;
    })

    if(isValid != -1){
        res.status(400).json({
            error:"user already exists",
        });
    }
       
    const token = jwt.sign({
        email:email,
    },
    process.env.SECRET_KEY
    );

     bcrypt.hash(password,10,(err,hash)=>{
        if(err){
            res.status(500).json({
                error:"Internal server error",
            });
        }
        
        const user ={
            name,
            email,
            password:hash,
        };
        temporaryData.push(user);
        res.status(200).json({
            message:"user added sucessfully to database",
            token:token,
        });
     });


};

exports.signIn = (req,res) =>{

};