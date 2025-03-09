import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import {
  collection,
  getDoc,
  deleteDoc,
  onSnapshot,
  doc,
  addDoc,
} from "firebase/firestore";
import Vehicle from "./Vehicle";
import TextInput from "../pageElements/textInput";
import Button from "../pageElements/button";
import warn from "../assets/warn.png";

const Vehicles = () => {
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [inputs, setInputs] = useState({});
  const [vehId, setVehId] = useState();
  const [fetchedVeh, setfetchedVeh] = useState([]);
  const [alert, setAlert] = useState(false);
  const inputTypes = [
    "Make",
    "Model",
    "Trim",
    "Color",
    "Prod Year",
    "Category",
    "Mileage",
    "Price",
    "Date Received",
    "Purchase Order No.",
    "Purchase Order Date",
    "Finance Company Id",
  ];
  const handleIdInput = (e) => setVehId(e.target.value);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNumChange = (e) => {
    const value = e.target.value;
    const formattedValue = (
      Number(value.replace(/\D/g, "")) || ""
    ).toLocaleString();
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: formattedValue,
    }));
  };

  const format = (e) => {
    e.preventDefault();
    const formatMiles = parseFloat(inputs.mileage.replace(/,/g, ""));
    const formatPrice = parseFloat(inputs["Price"].replace(/,/g, "") * 100);
    inputs.Mileage = formatMiles;
    inputs["Price"] = formatPrice;
  };

  useEffect(() => {
    try {
      onSnapshot(collection(db, "hdepot"), (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        if (data) {
          const ids = snapshot.docs.map((doc) => doc.id);
          const dbVehs = data.map((item, i) => {
            return Object.assign(item, { id: ids[i] });
          });

          setSavedVehicles(dbVehs);
        } else {
          console.log("Error fetching data from database");
        }
      });
    } catch (error) {
      console.log(`A system error has occurred: ${error}`);
    }
  }, []);

  async function getOneVehicle() {
    const docRef = doc(db, "hdepot", `${vehId}`);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const newcar = docSnap.data();
        newcar.id = docSnap._key.path.segments[1];
        setfetchedVeh(newcar);
      } else {
        console.log("DB item does not exist");
      }
    } catch (error) {
      console.log(`A system error has occurred: ${error}`);
    }
    setVehId("");
  }

  function validate() {
    const make = inputs.Make;
    const model = inputs.Model;
    const trim = inputs.Trim;
    const color = inputs.Color;
    const year = inputs["Prod Year"];
    const cat = inputs.Category;
    const miles = inputs.Mileage;
    const price = inputs["Price"];
    const date = inputs["Date Received"];
    const poNo = inputs["Purchase Order No."];
    const poDate = inputs["Purchase Order Date"];
    const finCoId = inputs["Finance Company Id"];

    if (
      !make ||
      !model ||
      !trim ||
      !color ||
      !year ||
      !cat ||
      !miles ||
      !price ||
      !date ||
      !poNo ||
      !poDate ||
      !finCoId
    ) {
      setAlert("Please fill out all fields");
      return false;
    }
    return true;
  }

  async function addData(e) {
    e.preventDefault();
    //format(e);
    const valid = validate();
    if (!valid) {
      return;
    }

    setSavedVehicles([...savedVehicles, inputs]);
    try {
      const docRef = await addDoc(collection(db, "hdepot"), inputs);
      inputs.id = docRef.id;
      setSavedVehicles([...savedVehicles, inputs]);
      setInputs({});
    } catch (error) {
      console.log(`Error saving vehicle to db: ${error}`);
    }
  }

  async function deleteData(e) {
    try {
      deleteDoc(doc(db, "hdepot", e));
      setfetchedVeh("");
    } catch (error) {
      console.log(`Error deleteing vehicle from db: ${error}`);
    }
  }
  console.log("~~~~~~~~~~~~~~~fetchedVehicle", fetchedVeh);

  return (
    <>
      <div className="vehicles-container">
        <h2 className="formHeader">Add Vehicle To Queue</h2>
        <div className="vehiclesRow">
          <div className="vehBox">
            <div className="vehiclesColumn">
              {inputTypes.map((type, i) => (
                <div className="inputContainer">
                  <TextInput
                    key={`${type}${i}`}
                    className="text-input"
                    name={type}
                    placeholder={type}
                    value={inputs[type] || ""}
                    onChange={
                      type === "mileage" || type === "price"
                        ? handleNumChange
                        : handleChange
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            {alert ? (
              <div className="alert-container">
                <div className="alert-items-container">
                  <img src={warn} className="warnImg" alt="warning image" />
                  <p>{alert}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Button
          className="auxButton"
          labelText="Add Vehicle"
          variant="contained"
          color="primary"
          onClick={addData}
        />
        <div>
          {savedVehicles.length > 0 ? (
            <h2 className="formHeader"> Your Vehicles</h2>
          ) : (
            <></>
          )}
          {savedVehicles.map((el, i) => (
            <Vehicle
              key={`${el.Model}${i}`}
              make={el.Make}
              model={el.Model}
              trim={el.Trim}
              color={el.Color}
              category={el.Category}
              mileage={el.Mileage}
              price={el.Price}
              year={el.Year}
              id={el.id}
              onClick={deleteData}
            />
          ))}
        </div>
        <div className="getHeader">
          <h2 className="formHeader2">Get Vehicle By ISDM</h2>
        </div>
        <div className="fetchBox">
          <div className="inputContainer">
            <TextInput
              className="text-input"
              name="vehId"
              placeholder="Vehicle ISDM"
              value={vehId}
              onChange={handleIdInput}
            />
          </div>
          <Button
            className="auxButton2"
            labelText="Get Vehicle"
            variant="contained"
            color="primary"
            onClick={getOneVehicle}
          />
        </div>
        <div>
          {fetchedVeh ? (
            <Vehicle
              make={fetchedVeh.Make}
              model={fetchedVeh.Model}
              trim={fetchedVeh.Trim}
              color={fetchedVeh.Color}
              year={fetchedVeh.Year}
              category={fetchedVeh.Category}
              mileage={fetchedVeh.Mileage}
              price={fetchedVeh.Price}
              id={fetchedVeh.id}
              onClick={deleteData}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Vehicles;
