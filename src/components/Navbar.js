import React from "react";

const Navbar = (props) => {
  return (
    <div className="navBarContainer">
      <div className="navRow">
        <span className="navSpan">Home</span>
        <span className="navSpan">Edit Profile</span>
        <span className="navSpan">Edit Settings</span>
        <span className="navSpan">New Request</span>
      </div>
    </div>
  );
};

export default Navbar;
