import React from "react";
import { formatNums } from "../utilities/utilities";
import Button from "../pageElements/button";

const Vehicle = (props) => {
  const { make, model, trim, color, year, category, mileage, price, id } =
    props;

  return (
    <div className="veh-container">
      <div className="vehBox">
        <div className="veh-col">
          <div className="veh-row">
            <p className="veh-text">
              <b>Make: </b>
              {make}
            </p>
            <p className="veh-text">
              <b>Model: </b>
              {model}
            </p>
            <p className="veh-text">
              <b>Trim: </b>
              {trim}
            </p>
            <p className="veh-text">
              <b>Color: </b>
              {color}
            </p>
          </div>
        </div>
        <div className="veh-col">
          <div className="veh-row">
            <p className="veh-text">
              <b>Year: </b>
              {year}
            </p>
            <p className="veh-text">
              <b>Category: </b>
              {category}
            </p>
            <p className="veh-text">
              <b>Mileage: </b>
              {formatNums(mileage)}
            </p>
          </div>
        </div>
        <div className="veh-col">
          <div className="veh-row-price">
            <p className="veh-text">
              <b>PVR Price: </b>${formatNums(price)}
            </p>
            <p className="veh-text">
              <b>ISDM: </b>
              {id}
            </p>
          </div>
        </div>
      </div>
      <div className="deleteButtonBox">
        <Button
          className="deleteButton"
          labelText="Delete Vehicle"
          variant="contained"
          color="primary"
          onClick={() => props.onClick(props.id)}
        />
      </div>
    </div>
  );
};

export default Vehicle;
