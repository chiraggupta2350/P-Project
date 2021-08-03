import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"


const CreateProduct = () => {
    useEffect(() => {
        const localdata = localStorage.getItem("userData")
        if (!localdata) {
            history.push("/signin")
        }
    }, [])
    const history = useHistory()
    const [url,setUrl] = useState()
    const [data, setData] = useState({
        productname: "",
        producttype: "",
        size: "",
        quantity: "",
        productcolor: ""
    })
    const [imageData, setImageData] = useState({
        image: "",
        imageName: "",
    })

    const inputData = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData({ ...data, [name]: value })
    }

    const setImage = (file) => {
        console.log("file==========",file)
        var dataToSet = {
            image : file[0],
            imageName : file[0].name
        }
        setImageData(dataToSet);
    }

    const submitData = (e) => {
        e.preventDefault();
        const { productname, producttype, size, quantity, productcolor } = data;

        let userData = localStorage.getItem("userData");
        userData = JSON.parse(userData);
        console.log("userData============",userData)
        const userId = userData._id
        console.log("submitData=========",imageData.image,userId)
        const formdata = new FormData()
        console.log("freg",formdata)
        formdata.append("file", imageData.image,imageData.imageName)
        formdata.append("upload_preset", "productphoto")
        formdata.append("cloud_name", "dq114qybx")
        console.log(formdata)
        fetch("https://api.cloudinary.com/v1_1/dq114qybx/image/upload", {
            method: "post",
            body: formdata
        }).then(res=>res.json())
        .then(data1=>{
            console.log("cccc",data1)
            //setUrl(data.url)
            var url = data1.url
                console.log("gggg",productname)
                console.log("tttt",producttype)
                fetch("/product", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productname, producttype, size, quantity, productcolor,url,userId
                    })
                }).then(res => res.json())
                .then((sendData) => {
                    if (sendData.message) {
                        window.alert(sendData.message)
                        history.push("/product")
                    }
                    else {
                        window.alert(sendData.error)
                    }
                })
        }).catch(err=>{
            console.log(err)
        })


    }
    return (
        <div className="row">
            <div className="col-md-7 mx-auto mt-5">
                <form>
                    <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-2 col-form-label">Product Name</label>
                        <div className="col-sm-10">
                            <input type="email" name="productname" value={data.productname} onChange={inputData} className="form-control" id="inputEmail3" placeholder="Enter product name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-2 col-form-label">Product Type</label>
                        <div className="col-sm-10">
                            <input type="email" name="producttype" value={data.producttype} onChange={inputData} className="form-control" id="inputEmail3" placeholder="Enter product type" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-2 col-form-label">Size</label>
                        <div className="col-sm-10">
                            <input type="email" name="size" value={data.size} onChange={inputData} className="form-control" id="inputEmail3" placeholder="Enter Size" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-2 col-form-label">Quantity</label>
                        <div className="col-sm-10">
                            <input type="email" name="quantity" value={data.quantity} onChange={inputData} className="form-control" id="inputEmail3" placeholder="Enter quantity" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Product Colour</label>
                        <div className="col-sm-10">
                            <input type="email" name="productcolor" value={data.color} onChange={inputData} className="form-control" id="inputPassword3" placeholder="Enter product color" />
                        </div>
                    </div>
                    <div className="custom-file">
                        <input type="file" onChange={(e) => setImage(e.target.files)} class="custom-file-input" id="customFile" />
                        <label className="custom-file-label" for="customFile">Choose file : {imageData.imageName}</label>
                    </div>
                    <div className="form-group row mt-2">
                        <div className="col-sm-10">
                            <button type="submit" onClick={submitData} className="btn btn-primary">Submit</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateProduct
