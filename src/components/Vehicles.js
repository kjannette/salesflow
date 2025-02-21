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

const Vehicles = () => {
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [inputs, setInputs] = useState({});
  const [vehId, setVehId] = useState();
  const [fetchedVeh, setfetchedVeh] = useState([]);
  const inputTypes = [
    "Make",
    "Model",
    "Trim",
    "Color",
    "Year",
    "Category",
    "Mileage",
    "Price",
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
    const formatPrice = parseFloat(inputs.price.replace(/,/g, "") * 100);
    inputs.Mileage = formatMiles;
    inputs.price = formatPrice;
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
        setfetchedVeh([newcar]);
      } else {
        console.log("DB item does not exist");
      }
    } catch (error) {
      console.log(`A system error has occurred: ${error}`);
    }
    setVehId("");
  }

  async function addData(e) {
    e.preventDefault();
    //format(e);
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

  return (
    <>
      <div className="vehicles-container">
        <h2 className="formHeader">Add A Vehicle to Your Queue</h2>
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
        </div>
        <Button
          className="auxButton"
          labelText="Add Vehicle"
          variant="contained"
          color="primary"
          onClick={addData}
        />
        <div>
          {savedVehicles && (
            <h2 className="formHeader"> Your Saved Vehicles</h2>
          )}
          {savedVehicles.map((el, i) => (
            <Vehicle
              key={`${el.model}${i}`}
              make={el.make}
              model={el.model}
              trim={el.trim}
              color={el.color}
              category={el.category}
              mileage={el.mileage}
              price={el.price}
              year={el.year}
              id={el.id}
              onClick={deleteData}
            />
          ))}
        </div>
        <div className="getHeader">
          <h2 className="formHeader2">Get A Vehicle By Id</h2>
        </div>
        <div className="fetchBox">
          <div className="inputContainer">
            <TextInput
              className="text-input"
              name="vehId"
              placeholder="Vehicle Id"
              value={vehId}
              onChange={handleIdInput}
            />
          </div>
          <Button
            className="auxButton"
            labelText="Get Vehicle"
            variant="contained"
            color="primary"
            onClick={getOneVehicle}
          />
        </div>
        <div>
          {fetchedVeh &&
            fetchedVeh.map((el, i) => (
              <Vehicle
                make={el.make}
                model={el.model}
                key={`${el.model}${i}`}
                trim={el.trim}
                color={el.color}
                year={el.year}
                category={el.category}
                mileage={el.mileage}
                price={el.price}
                id={el.id}
                onClick={deleteData}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Vehicles;
