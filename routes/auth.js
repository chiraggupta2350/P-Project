const express = require("express");
const User = require("../models/userSchema")

const router = express.Router()


router.post("/signup",async (req,res)=>{
    try{
        const {fullname,email,password} = req.body;
         const userExist = await User.findOne({email:email})
         if(userExist){
            return res.status(401).json({error:"Email id already exists please signin."})
         }
         else{
             const user = new User({
                 fullname,email,password
             })
            const dataSaved = await user.save()
            if(dataSaved){
                res.json({message:"Successfully registered"})
            }           
         }
    }catch(err){
        console.log(err)
    }    
})

router.post("/signin",async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            res.status(401).json({error:"plz filled the data"}) 
        }
        const UserExist = await User.findOne({email:email,password:password})
        if(UserExist){
           res.json({message:"successfully signin",UserExist})
        }
        else{
          res.status(401).json({error:"User Not Exists"})
        }
    }catch(err){
        console.log(err)
    }
   
})
router.get("/logout",(req,res)=>{
    res.json({message:"logout successfully"})
})

module.exports = router