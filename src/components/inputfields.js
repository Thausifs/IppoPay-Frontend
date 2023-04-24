import React from "react";
import "../css/components/inputfields.css";

function InputField({ placeholder, type, callback, value, icon }) {
  return (
    <>
      <div className="input-container">
        <span className="icon">
          <img className="inpfieldicon" src={icon} alt=""></img>
        </span>
        <input
          className="input-field"
          type={type}
          placeholder={placeholder}
          name="usrnm"
          onChange={(e) => callback(e)}
          value={value}
        />
      </div>
    </>
  );
}

export default InputField;
