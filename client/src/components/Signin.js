import React, { useState,useContext } from 'react'
import { useHistory } from "react-router-dom"
import { userContext } from '../App'

const Signin = () => {
    const history = useHistory()
    const {state,dispatch} = useContext(userContext);
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const inputData = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData({ ...data, [name]: value })
    }
    const submitData = (e) => {
        e.preventDefault()
        const { email, password } = data;
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        }).then(res => res.json())
            .then((senddata) => {
                if (senddata.message) {
                    localStorage.setItem("userData", JSON.stringify(senddata.UserExist))
                    window.alert(senddata.message)
                    history.push("/product")
                    dispatch({type:"USER",payload:true})
                }
                else {
                    window.alert(senddata.error)
                }
            })
    }
    return (
        <>
            <div className="row">
                <div className="col-md-4 mx-auto mt-5 ">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" name="email" value={data.email} onChange={inputData} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" name="password" value={data.password} onChange={inputData} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" onClick={submitData} class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signin
