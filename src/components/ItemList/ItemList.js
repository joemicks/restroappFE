import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import CommonHeader from '../CommonHeader/CommonHeader';
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
const ItemList = () => {
  const location = useLocation();
  const [totalItem, setTotalItems] = useState(0);
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems
      ? JSON.parse(savedItems)
      : [
        { id: 1, name: "Wheat Parota", totalPrice: 0, price: "29", calcprice: "29", type: "veg", color: "green", count: 0 },
        { id: 2, name: "Chicken Parota", totalPrice: 0, price: "119", calcprice: "119", type: "non-veg", color: "red", count: 0 },
        { id: 3, name: "Egg Parota", totalPrice: 0, price: "79", calcprice: "79", type: "egg", color: "green", count: 0 },
        { id: 4, name: "Ceylon Parota", totalPrice: 0, price: "30", calcprice: "30", type: "veg", color: "green", count: 0 },
        { id: 5, name: "Coin Parota", totalPrice: 0, price: "19", calcprice: "19", type: "veg", color: "green", count: 0 },
        { id: 6, name: "Parota", totalPrice: 0, price: "20", calcprice: "20", type: "veg", color: "green", count: 0 }

      ];
  });
  useEffect(() => {
    const totalAmount = items.map(item => item.totalPrice).reduce((acc, price) => acc + price, 0);
    setTotalItems(totalAmount);
    localStorage.setItem("cartItems", JSON.stringify(items));
    return () => {
      //localStorage.removeItem("cartItems");
    }
  }, [items])
  const handleIncrement = (id) => {

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, count: item.count + 1, totalPrice: (item.count + 1) * item.calcprice, price: 0 }
          : item
      )

    );
  };
  const handleDecrement = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1, totalPrice: (item.count - 1) * item.calcprice,price:item.totalPrice }
          : item
      )
    );
  };
  // Calculate total price using reduce
  const totalItems = items.reduce((acc, item) => acc + item.count, 0);
  return (
    <>
      <CommonHeader message={location.state.message} />
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
                    <h6 className="mb-0 me-3">₹{item.price || item.totalPrice}</h6>
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
                          onClick={() => handleDecrement(item.id)}
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
        <div className="position-fixed" style={{ bottom: "105px", right: "20px" }}>
          <Button variant="dark" className="rounded-circle p-3">
            <MdFoodBank size={40} color="white" />
          </Button>
        </div>
        {/* Floating Cart Button */}
        {totalItems > 0 ? (
          <div className="position-fixed bottom-0 start-0 w-100 p-3 shadow d-flex justify-content-between align-items-center" style={{ backgroundColor: 'orange', color: 'black', fontWeight: 'bold' }}>
            {/* Left Side - Total Price & Info */}
            <div className="d-flex flex-column">
              <span className="fw-bold">₹ {totalItem}</span>
              <small>Extra charges may apply</small>
            </div>
            {/* Right Side - Cart Items & View Order Button */}
            <div className="d-flex flex-column align-items-center">
              <span className="me-2">{totalItems} Item in cart</span>
              <button className="btn btn-light fw-bold">View Order</button>
            </div>
          </div>
        ) : (
          null
        )}
      </Container>
    </>
  )
}

export default ItemList;