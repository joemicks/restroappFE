import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { FaConciergeBell } from "react-icons/fa"; // Icon for Order Now button
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMainPage, setshowMainPage] = useState(false);
  const navigate = useNavigate();
  const Restaurant = "Rayasema Delicious Restaurant";
  useEffect(() => {
    console.log("useEffect triggered"); // Debugging log

    const timer = setTimeout(() => {
      console.log("Setting showMenu to true"); // Debugging log

      setShowMenu((prevCount) => !prevCount);
    }, 3000);

    return () => {
      console.log("Cleaning up timeout"); // Debugging log
      clearTimeout(timer);
    };
  }, []);
  const handleNavigate = () => {
    setshowMainPage(true);
    navigate("/category", { state: { message: Restaurant, status: showMainPage } });
  };
  return (
    <div className="container text-center mt-5">
      {!showMenu ? (
        <Container
          fluid
          className="d-flex justify-content-center align-items-center vh-100"
        >
          {/* Centered Logo */}
          <img
            src="/iconlogos.png"
            alt="App Logo"
            className="img-fluid"
          />
        </Container>
      ) : (
        <Container fluid className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
          {/* Background design */}

          <div className="logo-container d-flex align-items-center justify-content-center">
            <img src="/iconlogos.png" alt="Restaurant Logo" className="logo" />
            <h2 className="responsive-text">{Restaurant}</h2>
          </div>
          {/* Restaurant Name */}
          {/* Welcome Text */}
          <p className="welcome-text">Welcome</p>
          {/* Order Now Button */}
          <Button variant="light" className="order-button" onClick={handleNavigate}>
            <FaConciergeBell className="me-2" />
            Order Now
          </Button>
        </Container>
      )}
    </div>
  )
}

export default Homepage;