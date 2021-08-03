const express = require("express");
const Product = require("../models/productSchema");
const router = express.Router()

router.post("/product", async (req, res) => {
    try {
        const { productname, producttype, size, quantity, productcolor,url,userId } = req.body;
        console.log("ewrreer0",req.body,userId)
        if(!productname || !producttype || !size || !quantity || !productcolor || !url){
            return res.json({error:"plz filled the data"})
        }
        const product = new Product({
            productname, producttype, size, quantity, productcolor,url,userId
        })
        const data = await product.save()
        if (data) {
            res.status(201).json({message:"successfully saved"})
        }
    } catch (err) {
        console.log(err)
    }
})
router.get("/products/:userId", async (req,res)=>{
    try{
      const products = await Product.find({userId:req.params.userId})
      if(!products){
          res.json({error:"no products "})
      }
      else{
        res.json(products)  
      }
    }catch(err){
        console.log(err)
    }
})
module.exports = router