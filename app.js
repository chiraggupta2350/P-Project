const express = require("express")
const app = express();
const Port = process.env.PORT || 8000
require("./connection/conn")
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/product"))

 
if (process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}
app.listen(Port,()=>{
    console.log(`server is running at port ${Port}`)
})