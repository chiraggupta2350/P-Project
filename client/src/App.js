import React,{ createContext, useReducer } from 'react'
import { Route } from "react-router-dom"
import GetProducts from './components/Getproducts'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import CreateProduct from './components/Createproducts'
import Logout from './components/Logout'
import { initialState,reducer } from "./reducer/reducer"


export const userContext = createContext();

const App = () => {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <>
       <userContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Route path="/createproduct">
        <CreateProduct/>
      </Route>
      <Route path="/product">
        <GetProducts/>
      </Route>
      <Route exact path="/">
        {/* <GetProducts /> */}
        <Signin />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      </userContext.Provider>
    </>
  )
}

export default App
