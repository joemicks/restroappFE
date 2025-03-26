import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import CommonHeader from '../CommonHeader/CommonHeader';
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
const ItemList = () => {
  const location = useLocation();
  const [totalcartlist, setTotalCartList] = useState(0);
  const [totaAmountCalc, settotaAmountCalc] = useState(0);
  const foodItems = [
    { id: 1, name: "Wheat Parota", totalPrice: 0, price: "29", calcprice: "29", type: "veg", color: "green", count: 0, category: "veg_parota" },
    { id: 2, name: "Chicken Parota", totalPrice: 0, price: "119", calcprice: "119", type: "non-veg", color: "red", count: 0, category: "non_veg_parota" },
    { id: 3, name: "Egg Parota", totalPrice: 0, price: "79", calcprice: "79", type: "egg", color: "red", count: 0, category: "non_veg_parota" },
    { id: 4, name: "Ceylon Parota", totalPrice: 0, price: "30", calcprice: "30", type: "veg", color: "red", count: 0, category: "veg_parota" },
    { id: 5, name: "Coin Parota", totalPrice: 0, price: "19", calcprice: "19", type: "veg", color: "green", count: 0, category: "veg_parota" },
    { id: 6, name: "Parota", totalPrice: 0, price: "20", calcprice: "20", type: "veg", color: "green", count: 0, category: "veg_parota" },
    { id: 7, name: "panner biriyani", totalPrice: 0, price: "179", calcprice: "179", type: "veg", color: "green", count: 0, category: "veg_biriyani" },
    { id: 8, name: "mushroom biriyani", totalPrice: 0, price: "159", calcprice: "159", type: "non-veg", color: "red", count: 0, category: "veg_biriyani" },
    { id: 9, name: "chicken biriyani", totalPrice: 0, price: "179", calcprice: "179", type: "egg", color: "red", count: 0, category: "non_veg_biriyani" },
    { id: 10, name: "mutton biriyani", totalPrice: 0, price: "200", calcprice: "200", type: "veg", color: "red", count: 0, category: "non_veg_biriyani" },
    { id: 11, name: "chicken manjurian", totalPrice: 0, price: "169", calcprice: "169", type: "veg", color: "red", count: 0, category: "non_veg_manjurian" },
    { id: 12, name: "honey chicken", totalPrice: 0, price: "140", calcprice: "140", type: "veg", color: "red", count: 0, category: "non_veg_starters" },
    { id: 13, name: "chicken 65", totalPrice: 0, price: "199", calcprice: "199", type: "veg", color: "red", count: 0, category: "non_veg_starters" },
    { id: 14, name: "broasted chicken", totalPrice: 0, price: "119", calcprice: "119", type: "non-veg", color: "red", count: 0, category: "non_veg_starters" },
    { id: 15, name: "mushroom fry dry", totalPrice: 0, price: "179", calcprice: "179", type: "egg", color: "green", count: 0, category: "veg_starters" },
    { id: 16, name: "panner pepper fry", totalPrice: 0, price: "130", calcprice: "130", type: "veg", color: "green", count: 0, category: "veg_starters" },
    { id: 17, name: "chicken pepper fry", totalPrice: 0, price: "189", calcprice: "189", type: "veg", color: "red", count: 0, category: "non_veg_starters" },
    { id: 18, name: "veg_parota", totalPrice: 0, price: "20", calcprice: "20", type: "veg", color: "green", count: 0, category: "veg_parota" },
    { id: 19, name: "veg curry with panner", totalPrice: 0, price: "119", calcprice: "119", type: "non-veg", color: "red", count: 0, category: "veg_gravy" },
    { id: 20, name: "veg curry with mushroom", totalPrice: 0, price: "79", calcprice: "79", type: "egg", color: "green", count: 0, category: "veg_gravy" },
    { id: 21, name: "non veg curry with mutton", totalPrice: 0, price: "79", calcprice: "79", type: "veg", color: "red", count: 0, category: "non_veg_gravy" },
    { id: 22, name: "non veg curry with chicken ", totalPrice: 0, price: "79", calcprice: "79", type: "veg", color: "red", count: 0, category: "non_veg_gravy" },
    { id: 23, name: "veg roll with addon masala", totalPrice: 0, price: "20", calcprice: "20", type: "veg", color: "green", count: 0, category: "veg_roll" }
  ];

  // Implementations for calclautions and store in localstorage
  const { category } = location.state;
  // Function to get stored cart items per category
  const getStoredItems = () => {
    const storedCart = localStorage.getItem(`cartItems_${category}`);
    // If there are stored items, return them; otherwise, filter by category
    return storedCart ? JSON.parse(storedCart) : foodItems.filter((item) => item.category === category);
  };
  const [items, setItems] = useState(getStoredItems());
  // Update localStorage when items change
  useEffect(() => {
    localStorage.setItem(`cartItems_${category}`, JSON.stringify(items));

  }, [items, category]);

  useEffect(() => {
    setItems(getStoredItems());
  }, [category]);

  useEffect(() => {
    // impleemnt of lcoatostroage to persist on back to litem lsits on click of inc and dec
    let totalAmount = 0;
    let totalSumCount = 0;
    Object.keys(localStorage).forEach((key) => {
      // Check if key starts with "cartItems_"
      if (key.startsWith("cartItems_")) {
        const cartData = JSON.parse(localStorage.getItem(key)) || [];
        // Sum up totalPrice from each category
        totalAmount += cartData
          .map(item => item.totalPrice || 0) // Extract totalPrice
          .reduce((acc, price) => acc + price, 0); // Sum up all prices
        settotaAmountCalc(totalAmount);
        // Sum up count    
        totalSumCount += cartData.reduce((sum, item) => sum + item.count, 0);
        setTotalCartList(totalSumCount);
      }
    });
    return () => {
      //  localStorage.removeItem("cartItems");
    }
  }, [items])

  //End here...

  useEffect(() => {

    // on load time fetch persist details frm local
    let totalAmount = 0;
    let totalSumCount = 0;
    // Get all keys from localStorage
    Object.keys(localStorage).forEach((key) => {

      // Check if key starts with "cartItems_"
      if (key.startsWith("cartItems_")) {
        const cartData = JSON.parse(localStorage.getItem(key)) || [];
        // Sum up totalPrice from each category
        totalAmount += cartData
          .map(item => item.totalPrice || 0) // Extract totalPrice
          .reduce((acc, price) => acc + price, 0); // Sum up all prices
        settotaAmountCalc(totalAmount);
        totalSumCount += cartData.reduce((sum, item) => sum + item.count, 0);
        setTotalCartList(totalSumCount);
      }
    });

  }, [])

  const handleIncrement = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, count: item.count + 1, totalPrice: (item.count + 1) * item.calcprice, price: 0 }
          : item
      )
    );

  };
  const handleDecrement = (e, id) => {
    e.preventDefault();

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1, totalPrice: (item.count - 1) * item.calcprice, price: item.totalPrice }
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
                    <h6 className="mb-0 me-3">₹{item.count > 0 ? item.totalPrice : item.calcprice}</h6>
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
                          onClick={(e) => handleDecrement(e, item.id)}
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
        {(totaAmountCalc > 0 || totalItems > 0) ? (
          <div className="position-fixed bottom-0 start-0 w-100 p-3 shadow d-flex justify-content-between align-items-center" style={{ backgroundColor: 'orange', color: 'black', fontWeight: 'bold' }}>
            {/* Left Side - Total Price & Info */}
            <div className="d-flex flex-column">
              <span className="fw-bold">₹ {totaAmountCalc}</span>
              <small>Extra charges may apply</small>
            </div>
            {/* Right Side - Cart Items & View Order Button */}
            <div className="d-flex flex-column align-items-center">
              <span className="me-2">{totalcartlist ? totalcartlist + " " + "Item in cart" : 0}</span>
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