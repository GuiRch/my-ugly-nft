// React
import React, { useCallback, useEffect, useRef, useState } from "react";

const ColorCard = ({ color, onColorChange }) => {
  // const isSelected = color === backgroundColor;

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
      width: 70,
      height: 80,
      padding: 3,
      cursor: "pointer",
      transition: "box-shadow 0.2s ease-in-out",
    },
    customColor: {
      display: "flex",
      borderStyle: "solid",
      height: 50,
      width: 50,
      borderRadius: 5,
      borderWidth: "2px",
      marginBottom: 2,
      backgroundColor: color,
      boxShadow: "2px 2px",
    },
  };

  return (
    <div
      style={styles.customColorContainer}
      onClick={() => onColorChange(color)}
    >
      <div
        style={styles.customColor}
      ></div>
      {/* <input type='text' /> */}
      <span style={{ fontSize: 10, fontWeight: "bold" }}>{color}</span>
    </div>
  );
};

export default ColorCard;
