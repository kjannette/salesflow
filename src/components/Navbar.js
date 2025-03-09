import React from "react";

const Navbar = (props) => {
  return (
    <div className="navBarContainer">
      <div className="navRow">
        <span className="navSpan">Your Dashboard</span>
        <span className="navSpan">Edit Profile</span>
        <span className="navSpan">Edit Settings</span>
        <span className="navSpan">Generate Reports</span>
        <span className="navSpan">Change View</span>
      </div>
    </div>
  );
};

export default Navbar;
