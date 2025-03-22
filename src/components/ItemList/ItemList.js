import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import CommonHeader from '../CommonHeader/CommonHeader';
import { Button,Container ,Row,Col,Card

 } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
const ItemList = (props) =>{
    console.log(props,"props values");
   const location = useLocation();
   const [handleAddSet,setHandleAdd] = useState(false);
   const [items, setItems] = useState([
    { id: 1, name: "Wheat Parota", price: "₹29.00", type: "veg", color: "green",count:0 },
        { id: 2, name: "Chicken Parota", price: "₹119.00", type: "non-veg", color: "red",count:0},
        { id: 3, name: "Egg Parota", price: "₹79.00", type: "egg", color: "green",count:0 },
        { id: 4, name: "Ceylon Parota", price: "₹29.00", type: "veg", color: "green",count:0 },
        { id: 5, name: "Coin Parota", price: "₹19.00", type: "veg", color: "green",count:0 },
        { id: 6, name: "Parota", price: "₹29.00", type: "veg", color: "green",count:0 }
  ]);
     console.log(location, "status 0099999")
     const menuItems = [
       
      ];
      const handleAdd = () =>{
        setHandleAdd(true);
      }
      const handleIncrement = (id) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, count: item.count + 1 } : item
          )
        );
      };
    
      const handleDecrement = (id) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id && item.count > 0
              ? { ...item, count: item.count - 1 }
              : item
          )
        );
      };
    return(
    
        <>
       <CommonHeader message = {location.state.message} />
       <Container fluid className="p-3">
      <Row className="align-items-center mb-3">
    <Col xs={8} lg={8} sm={6} className="text-start">
      <h4 className="mb-0">{location.state.itemName}</h4>
    </Col>
    <Col xs={4} lg={4} sm={6} className="text-end">
      <Button variant="warning" className="rounded-pill px-3" onClick={() => window.history.back()}>
        <FaArrowLeft /> Back
      </Button>
    </Col>
  </Row>

  <Row>
        {items.map((item) => (
          <Col xs={12} md={6} lg={4} key={item.id} className="mb-3">
            <Card className="border">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {/* Food Type Icon */}
                  <span className="me-2" style={{ color: item.color, fontSize: "1.2rem" }}>⬤</span>
                  <div>
                    <Card.Title className="mb-0">{item.name}</Card.Title>
                    {item.count != 0 && <small className="text-muted">{item.count} pieces</small>}
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <h6 className="mb-0 me-3">{item.price}</h6>
                  {item.count === 0 ? (
            <Button variant="outline-danger" size="sm"
              onClick={() => handleIncrement(item.id)}
            >
              Add +
            </Button>
          ) : 
                   
 <>
                   <Button
                   variant="outline-danger"
                   className="fw-bold px-2 py-1 border-0"
                   onClick={() =>  handleDecrement(item.id)}
                 >
                   -
                 </Button>
                 <span className="mx-3 fw-bold">{item.count}</span>
                 <Button
                   variant="outline-danger"
                   className="fw-bold px-2 py-1 border-0"
                   onClick={() => handleIncrement(item.id)}
                 >
                   +
                 </Button>
                 </>
                  }
                 
                </div>

                {/* After Click add button */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

       {/* Floating Cart Button */}
       <div className="position-fixed bottom-0 end-0 m-4">
        <Button variant="dark" className="rounded-circle p-3">
          <MdFoodBank size={40} color="white"  />
        </Button>
      </div>
    
    </Container>
       
      </>
     
    )

    

}

export default ItemList;