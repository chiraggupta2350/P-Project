const mongoose = require("mongoose");

const DB ="mongodb+srv://chirag:star@cluster0.v76ml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("successfully connected")
}).catch(err=>{
    console.log(err)
})