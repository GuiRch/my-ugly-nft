// React
import React, { useCallback, useEffect, useRef, useState } from "react";
// Utils
import { darken, lighten } from "polished";
// Icons
import { FaEraser, FaPencilAlt } from "react-icons/fa";
import { ImCross, ImMinus } from "react-icons/im";

const colors = [
  "#C780E8",
  "#9D94FF",
  "#59ADF6",
  "#08CAD1",
  "#42D6A4",
  "#F8F38D",
  "#FFB480",
  "#FF6961",
];

const DrawingTools = ({
    selectedColor, 
    onColorChange,
    brushSize,
    onBrushSizeChange,
    selectedTool,
    onToolChange,
    onDrawingPreview
}) => {

  const styles = {
    toolsBlock: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 15,
      borderStyle: "solid",
      borderWidth: 3,
      borderRadius: 5,
    },
    colorSelector: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: "wrap",
      maxWidth: 170,
      gap: 7.5,
    },
    brushSizeSelector: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      flexWrap: "wrap",
    },
    colorCircle: {
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: 5,
      width: 30,
      height: 30,
      cursor: "pointer",
    },
    brushSizeCircle: {
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: 50,
    },
    tools: {
      display: "flex",
      justifyContent: "space-around",
    },
    toolIconBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
      borderStyle: "solid",
      borderRadius: 5,
      cursor: "pointer",
      transition: "box-shadow 0.2s ease-in-out",
    },
    iconStyle: {
      fontSize: 20,
      height: 25,
      width: 25,
      margin: 5,
    },
  };

  // ToolBox components
  const renderCustomColor = (color) => {
    const isSelected = color === selectedColor;
    const customColorContainer = {
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
    };
    return (
      <div style={customColorContainer} onClick={() => onColorChange(color)}>
        <div
          style={{
            display: "flex",
            borderStyle: "solid",
            height: 50,
            width: 50,
            borderRadius: 5,
            borderWidth: "2px",
            marginBottom: 2,
            backgroundColor: color,
            boxShadow: "2px 2px",
          }}
        ></div>
        {/* <input type='text' /> */}
        <span style={{ fontSize: 10, fontWeight: "bold" }}>{color}</span>
      </div>
    );
  };

  const renderColorCircle = (color, index) => {
    const isSelected = color === selectedColor;
    const circleStyle = {
      ...styles.colorCircle,
      backgroundColor: color,
      boxShadow: isSelected
        ? `inset 2px 2px 2px ${darken(
            0.3,
            color
          )}, inset -2px -2px 2px ${lighten(0.3, color)}`
        : "2px 2px",
      transition: "box-shadow 0.2s ease-in-out",
    };
    return (
      <div style={circleStyle} onClick={() => onColorChange(color)} key={index}></div>
    );
  };

  const renderColorSelector = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={styles.colorSelector}>
          {colors.map((color, index) => renderColorCircle(color, index))}
        </div>
        <div>{renderCustomColor("#FFFFFF")}</div>
      </div>
    );
  };

  const renderBrushSizeSelector = () => {
    const handleBrushSizeChange = (event) => {
      onBrushSizeChange(event.target.value);
    };

    const circleRadius = brushSize / 2;

    const thumbStyles = {
      appearance: "none",
      width: "50px",
      height: "20px",
      borderRadius: "50%",
      background: "red",
      cursor: "pointer",
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "#F5EDB5",
            borderStyle: "solid",
            borderRadius: 5,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 100,
            boxShadow: "3px 3px",
          }}
        >
          <svg height="50" width="50">
            <circle cx="25" cy="25" r={circleRadius} fill="black" />
          </svg>
        </div>
        <div>
          <input
            style={{
              WebkitAppearance: "none", // Hide the default appearance in WebKit browsers
              height: "10px",
              background: "#B8DCB8",
              appearance: "none",
              transition: "opacity .2s",
              borderStyle: "solid",
              borderRadius: 5,
              backgroundColor: "#000000",
              outline: "none",

              "::webkitSliderThumb": thumbStyles,
              "::mozRangeThumb": thumbStyles,
              "::msThumb": thumbStyles,
            }}
            type="range"
            min="1"
            max="30"
            value={brushSize}
            onChange={handleBrushSizeChange}
          />
        </div>
      </div>
    );
  };

  const renderToolSelector = () => {
    return (
      <div style={styles.tools}>
        <div
          style={{
            ...styles.toolIconBox,
            backgroundColor: selectedTool == "pen" ? "#F5EDB5" : "#F2ECDC",
            boxShadow:
              selectedTool == "pen"
                ? `inset 3px 3px 2px ${darken(
                    0.4,
                    "#F5EDB5"
                  )}, inset -2px -2px 4px ${lighten(0.2, "#F5EDB5")}`
                : "2px 2px",
          }}
          onClick={() => onToolChange("pen")}
        >
          <FaPencilAlt
            className={selectedTool === "pen" ? "selected" : ""}
            style={styles.iconStyle}
          />
        </div>
        <div
          style={{
            ...styles.toolIconBox,
            backgroundColor: selectedTool == "eraser" ? "#F5EDB5" : "#F2ECDC",
            boxShadow:
              selectedTool == "eraser"
                ? `inset 3px 3px 2px ${darken(
                    0.4,
                    "#F5EDB5"
                  )}, inset -2px -2px 4px ${lighten(0.2, "#F5EDB5")}`
                : "2px 2px",
          }}
          onClick={() => onToolChange("eraser")}
        >
          <FaEraser
            className={selectedTool === "eraser" ? "selected" : ""}
            style={styles.iconStyle}
          />
        </div>
      </div>
    );
  };

  return (
    <div style={styles.toolsBlock}>
      {renderBrushSizeSelector()}
      {renderColorSelector()}
      {renderToolSelector()}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          borderWidth: "3px",
          borderStyle: 'solid',
          backgroundColor: "#B8DCB8",
          boxShadow: "3px 3px",
          padding: 10,
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 15,
          cursor: 'pointer'
        }}
        onClick={() => onDrawingPreview()}
      >
        Create my NFT
      </div>
    </div>
  );
};

export default DrawingTools;
