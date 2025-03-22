import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage"
import CategoriesPage from "./components/Categories/CategoriesPage"
import ItemList from "./components/ItemList/ItemList";
const App = () => {
 
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />  
        <Route path="/Category" element={<CategoriesPage />} /> 
        <Route path="/itemview/:id" element={<ItemList />} />   
             
      </Routes>
      </Router> 
  );
};

export default App;

