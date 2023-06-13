// React
import React, { useState, useEffect } from "react";

const ColorCard = ({ color, onColorChange }) => {
  const [inputColor, setInputColor] = useState("transparent");

  const handleInputChange = (event) => {
    setInputColor(event.target.value);
  };

  useEffect(() => {
    onColorChange(inputColor)
  }, [inputColor])

  const styles = {
    customColorContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: 5,
      boxShadow: "3px 3px",
      width: 80,
      height: 95,
      padding: 3,
      cursor: "pointer",
      transition: "box-shadow 0.2s ease-in-out",
    },
    customColor: {
      display: "flex",
      borderStyle: "solid",
      height: 60,
      width: 60,
      borderRadius: 5,
      borderWidth: "2px",
      marginBottom: 2,
      boxShadow: "2px 2px",
    },
    input: {
      fontSize: 12,
      // appearance: 'none',
      fontWeight: "bold",
      width: 60,
      textAlign: "center",
    },
  };

  return (
    <div
      style={styles.customColorContainer}
      onClick={() => setInputColor(color)}
    >
      {color ? (
        <>
          <div style={{...styles.customColor, backgroundColor: color}}></div>
          <span style={{ fontSize: 12, fontWeight: "bold" }}>{color}</span>
        </>
      ) : (
        <>
          <div style={{...styles.customColor, backgroundColor: inputColor}}></div>
          <input
            type="text"
            // placeholder="#"
            style={styles.input}
            value={inputColor}
            onChange={handleInputChange}
          />
        </>
      )}
    </div>
  );
};

export default ColorCard;
