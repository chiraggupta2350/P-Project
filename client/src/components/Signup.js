import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

const Signup = () => {
    const [nameError,showFullNameError] = useState(false)
    const [emailError,showEmailError] = useState(false)
    const [passwordError,showPasswordError] = useState(false)
    const [message,showMessage] = useState('');

    const history = useHistory()
    const [data, setData] = useState({
        fullname: "",
        email: "",
        password: ""
    })
    // let showEmailError = false,showFullNameError=false,showPasswordError=false;

    const inputValue = (fieldName,value) => {
        console.log("inputValue=========",fieldName,value)
        setData({ ...data, [fieldName]: value })
        var password = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
        console.log("!password.test(va=======",password.test(value))
        if(fieldName == "fullname" && value.length < 5){
            console.log("1111111111111111111111111111")
            showFullNameError(true);
            showMessage("Name must be atleast 5 character");
        }else if(fieldName == "email" && !value.match(/.+@.+/)){
            showEmailError(true);
            showMessage("Please enter valid email.");
        }else if(fieldName == "password" && !password.test(value)){
            showPasswordError(true);
            showMessage("Password contain special character,Capital letter and  digit");
        }else{
            showFullNameError(false);
            showEmailError(false);
            showPasswordError(false);
        }
    }
    const submitData = (e) => {
        e.preventDefault()
        const { fullname, email, password } = data;
        if(!fullname || !email || !password){
            window.alert("Please enter all the fields.")
        }else{
            fetch("/signup", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullname, email, password
                })
            }).then(res=>res.json())
            .then((senddata)=>{
                if(senddata.message){
                window.alert(senddata.message)
                history.push("/signin")
                }
             else{
                window.alert(senddata.error)
             }
            })
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-md-4 mx-auto mt-5 ">
                    <form method="POST">
                        <div class="form-group">
                            <label for="exampleInputEmail1">FullName</label>
                            <input type="name" name="fullname" value={data.fullname} onChange={(e)=>{ inputValue("fullname",e.target.value)}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        {nameError && <span>{message}</span>}
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" name="email" value={data.email} onChange={(e)=>{ inputValue("email",e.target.value)}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        {emailError && <span>{message}</span>}
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" name="password" value={data.password} onChange={(e)=>{ inputValue("password",e.target.value)}} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        {passwordError && <span>{message}</span>}
                        <button type="submit" disabled={nameError || emailError || passwordError} class="btn btn-primary" onClick={submitData}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
