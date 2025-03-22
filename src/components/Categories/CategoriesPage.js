import { Container, Button } from "react-bootstrap";
import "./CategoriesPage.css";
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { MdFoodBank } from "react-icons/md";
import ItemList from "../ItemList/ItemList";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../CommonHeader/CommonHeader";
const categories = [
  { id: 1, name: "Veg Startes", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 2, name: "Non Veg Startes", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 3, name: "Veg Gravies", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 4, name: "Non Veg Gravies", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 5, name: "Parota", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 6, name: "Veg Briyani", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 7, name: "Non Veg Briyani", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 8, name: "Veg Chinese", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 9, name: "Non Veg Rolls", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 10, name: "Non Veg Chicken Briyani", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 11, name: "Veg Pulakh", icon: <MdFoodBank size={35} color="orange" /> },
  { id: 12, name: "Non Veg Manjurian", icon: <MdFoodBank size={35} color="orange" /> },

];
const CategoriesPage = () => {
  const location = useLocation();
  console.log(location, "status 009")
  const message = location.state?.message || "No message received";
  const [listClick, setListClick] = useState(false);
  const [listItem, setListItem] = useState([]);
  const navigate = useNavigate();
  const handleClick = (item) =>{
    let state = {
      itemId : item.id,
      itemName:item.name,
      message: message
    }
   debugger;
    navigate(`/itemview/${item.id}`,{state:state});
  }
  return (
    <Container>
       <CommonHeader message = {message}/>
      {/* cards */}
      <div className="container mt-4">
        <div className="row g-2">
          {categories.map((item) => (
            <div key={item.id} className="col-4 col-md-4 col-lg-4">
              <div className="card bgoutline-light text-center p-2 shadow-sm small-card d-flex flex-column justify-content-center align-items-center" onClick={() =>{handleClick(item)}}>
                <div className="text-primary">{item.icon}</div>
                <p className="mt-1 small-text text-truncate">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

     

    </Container>
  )
}


export default CategoriesPage;