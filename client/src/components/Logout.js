import React,{useEffect,useContext} from 'react'
import { useHistory } from 'react-router'
import { userContext } from '../App';

const Logout = () => {
    const {state,dispatch} = useContext(userContext);
    const history = useHistory();
    useEffect(() => {
        fetch("/logout",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        }).then(res=>res.json())
        .then((data)=>{
            localStorage.clear();
            dispatch({type:"USER",payload:false})
            history.push("/signin")
        }).catch(err=>{
            console.log(err)
        })
    })
    return (
        <div>
            
        </div>
    )
}
<h1>logout ka </h1>
export default Logout
