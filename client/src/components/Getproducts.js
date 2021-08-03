import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';

const GetProducts = () => {
  const [value, setValue] = useState([]);
  const history = useHistory()
  let localData = localStorage.getItem("userData")
  localData = JSON.parse(localData);
  useEffect(() => {
    console.log("localData===========",localData)
    if (localData) {
      fetch("/products/" + localData._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then((data) => {
          if (data) {
            setValue(data)
            if (!localData) {
              history.push("/signin")
            }
          } else {
            window.alert(data.error)
          }
        })
    }
  }, [])
  return (
    <div className="row">
      <div className="col-md-3 mx-auto" style={{border:"1px solid black"}}>
        <form method="get">
          {
            value.map(item => {
              return <>
              <div>
              <div><img src={item.url} className="mt-3" style={{width:"310px"}}/></div>
              <div>
                <p style={{marginTop:"10px",fontWeight:'bold',fontSize:"20px"}}>ProductName: {item.productname}</p>
                <p style={{marginTop:"10px",fontWeight:'bold',fontSize:"20px"}}>ProductType: {item.producttype}</p>
                <p style={{marginTop:"10px",fontWeight:'bold',fontSize:"20px"}}>ProductSize: {item.size}</p>
                <p style={{marginTop:"10px",fontWeight:'bold',fontSize:"20px"}}>ProductQuantity: {item.quantity}</p>
                <p style={{marginTop:"10px",fontWeight:'bold',fontSize:"20px"}}>ProductColor: {item.productcolor}</p>
              </div>
              </div>
              </>
            })
          }
        </form>
      </div>
    
      </div>
  )
}

export default GetProducts
