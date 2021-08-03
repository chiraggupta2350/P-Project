import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { userContext } from '../App'

const Navbar = () => {
    const RenderList = () => {
        const { state, dispatch } = useContext(userContext);
        let userData = localStorage.getItem("userData");
        userData = JSON.parse(userData);
        console.log("userData=========",userData)
        if (userData) {
            return (
                <>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/product">Product</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/createproduct">CreateProduct</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </>
            )
        }
        else {
            return (
                <>
                    {/* <li className="nav-item">
                        <NavLink className="nav-link" to="/signin">Signin</NavLink>
                    </li> */}
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Signup</NavLink>
                    </li>
                </>
            )
        }
    }
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink to="/" className="navbar-brand" >Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <RenderList />
                        </ul>
                    </div>
                </nav>

            </>
        )
    }

    export default Navbar
