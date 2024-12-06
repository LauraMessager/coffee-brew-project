import React, { useState } from "react";
import "../styles/ratioConverter.scss";

const RatioConverter = () => {
  const [coffee, setCoffee] = useState("");
  const [water, setWater] = useState("");
  const [ratio, setRatio] = useState(16);
  const [unit, setUnit] = useState("grams");

  const convertToWater = (coffee, ratio) => (coffee * ratio).toFixed(2);
  const convertToCoffee = (water, ratio) => (water / ratio).toFixed(2);

  const handleCoffeeChange = (e) => {
    const coffeeValue = e.target.value;
    setCoffee(coffeeValue);
    if (coffeeValue) {
      setWater(convertToWater(coffeeValue, ratio));
    } else {
      setWater("");
    }
  };

  const handleWaterChange = (e) => {
    const waterValue = e.target.value;
    setWater(waterValue);
    if (waterValue) {
      setCoffee(convertToCoffee(waterValue, ratio));
    } else {
      setCoffee("");
    }
  };

  const handleRatioChange = (e) => {
    setRatio(e.target.value);
    if (coffee) setWater(convertToWater(coffee, e.target.value));
    if (water) setCoffee(convertToCoffee(water, e.target.value));
  };

  const toggleUnit = () => {
    const conversionFactor = unit === "grams" ? 0.035274 : 28.3495;
    setUnit(unit === "grams" ? "ounces" : "grams");
    setCoffee((prev) => (prev * conversionFactor).toFixed(2));
    setWater((prev) => (prev * conversionFactor).toFixed(2));
  };

  return (
    <div className="ratio-converter">
      <h1>Ratio Converter</h1>
      <div className="form-group">
        <label>Ratio (e.g., 1:16): </label>
        <input
          type="number"
          value={ratio}
          onChange={handleRatioChange}
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Coffee ({unit}): </label>
        <input
          type="number"
          value={coffee}
          onChange={handleCoffeeChange}
          placeholder={`Enter coffee amount in ${unit}`}
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Water ({unit}): </label>
        <input
          type="number"
          value={water}
          onChange={handleWaterChange}
          placeholder={`Enter water amount in ${unit}`}
          className="input"
        />
      </div>
      <div className="switch-container">
        <span>Unit: {unit}</span>
        <label className="switch">
          <input type="checkbox" onChange={toggleUnit} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default RatioConverter;
