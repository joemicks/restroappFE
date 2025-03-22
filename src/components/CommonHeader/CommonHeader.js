import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { CgRadioChecked } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

const CommonHeader = React.memo((props) => {
    console.log("Child Rendered!");
    const [selectedOption, setSelectedOption] = useState("veg");
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");

    return (
        <>
            <div className="container mt-4">
            {showSearch && (
                    <div className="d-flex w-100">
                        <input
                            type="text"
                            className="form-control rounded-pill me-8"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        {/* <span className="input-group-text fs-5">
                <FaSearch  className="text-muted"/>
              </span> */}
                        <button className="border-0 bg-transparent ms-2" onClick={() => setShowSearch(false)}>
                            <AiOutlineClose color="white" className="cursor-pointer" size={25} />
                        </button>
                    </div>
                )}
                {/* Responsive Header Row */}
                {!showSearch && <div className="row align-items-center border-bottom pb-2">
                    {/* Left: Logo and Text */}
                    {/* Search Bar (Appears When Search Icon is Clicked) */}
                    <div className="col-6 d-flex align-items-center">
                        <img src="/iconsmall.png" alt="Logo" className="logo-img me-2" />
                        <h5 className="small-text text-truncate mb-0">{props.message}</h5>
                    </div>
                    {/* Right: Search Icon (Responsive alignment) */}
                    <div className="col-6 text-end">
                        <FaSearch className="search-icon" color="white" onClick={() => setShowSearch(true)} />
                    </div>
                </div>}
                <div>
                </div>
            </div>
            <div className="container mt-0">
                {/* Parent Row with Flex for Perfect Alignment */}
                <div className="row align-items-center">
                    {/* Logo and Text - Left Side */}
                    <div className="col-6 d-flex align-items-center">
                        <img
                            src="/iconsmall.png" // Update with your logo path
                            alt="Logo"
                            className="logo-img-small me-2"
                        />
                        <span>4</span>
                    </div>
                    {/* Radio Buttons - Right Side */}
                    <div className="col-6 d-flex justify-content-end mt-2" style={{ borderRadius: "8px" }}>
                        <div className="btn-group" role="group">
                            <input
                                type="radio"
                                className="btn-check"
                                name="foodType"
                                id="veg"
                                value="veg"
                                checked={selectedOption === "veg"}
                                onChange={() => setSelectedOption("veg")}
                            />
                            <label className="btn btn-outline-success btn-sm me-4 d-flex align-items-center gap-2 border-2" htmlFor="veg">
                                <CgRadioChecked color="white" size={16} />
                                <span>Veg</span>
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="foodType"
                                id="nonVeg"
                                value="nonVeg"
                                checked={selectedOption === "nonVeg"}
                                onChange={() => setSelectedOption("nonVeg")}
                            />
                            <label className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 border-2" htmlFor="nonVeg">
                                <CgRadioChecked size={16} color="yellow" />
                                <span className="text-truncate">Non-Veg</span>
                            </label>
                        </div>
                    </div>
                </div>
                </div>
                </>
)  
  });



export default CommonHeader;