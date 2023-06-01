import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaEraser, FaPencilAlt } from "react-icons/fa";
import { ImCross, ImMinus } from "react-icons/im";
import { darken, lighten } from "polished";

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

const DrawingComponent = () => {
  // Refs
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  // Local State
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [customColor, setCustomColor] = useState("#FFFFFF");
  const [brushSize, setBrushSize] = useState(5);
  const [selectedTool, setSelectedTool] = useState("pen");
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0,
  });

  // use effect
  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const styles = {
    componentBlock: {
      display: "flex",
      flexDirection: "column",
      borderStyle: "solid",
      borderWidth: "5px",
      borderRadius: 5,
      boxShadow: "10px 10px",
      backgroundColor: "#E2FFE5",
    },
    drawingWindowHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderStyle: "solid",
      borderWidth: "0px 0px 5px 0px",
      background: "#B8DCB8",
    },
    drawingWindowHeaderTitle: {},
    drawingWindowContent: {
      display: "flex",
      padding: 10,
      gap: 10,
      background: "#F2ECDC",
    },
    toolsBlock: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 15,
      borderStyle: "solid",
      borderWidth: 3,
      borderRadius: 5,
      // backgroundColor: "#E2FFE5"
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

  // Drawing functions
  const draw = useCallback(
    (x, y) => {
      if (mouseDown) {
        ctx.current.beginPath();
        ctx.current.strokeStyle = selectedColor;
        ctx.current.lineWidth = brushSize;
        ctx.current.lineJoin = "round";
        ctx.current.moveTo(lastPosition.x, lastPosition.y);
        ctx.current.lineTo(x, y);
        ctx.current.closePath();
        ctx.current.stroke();
        if (selectedTool === "eraser") {
          ctx.current.globalCompositeOperation = "destination-out";
        } else {
          ctx.current.globalCompositeOperation = "source-over";
        }

        setPosition({
          x,
          y,
        });
      }
    },
    [lastPosition, mouseDown, selectedColor, setPosition]
  );

  // Handle Mouse events
  const onMouseDown = (e) => {
    const boundingRect = canvasRef.current.getBoundingClientRect();
    setPosition({
      x: e.pageX - boundingRect.left,
      y: e.pageY - boundingRect.top,
    });
    setMouseDown(true);
  };

  const onMouseUp = (e) => {
    setMouseDown(false);
  };

  const onMouseMove = (e) => {
    const boundingRect = canvasRef.current.getBoundingClientRect();
    draw(e.pageX - boundingRect.left, e.pageY - boundingRect.top);
  };

  // Utils
  const clear = () => {
    ctx.current.clearRect(
      0,
      0,
      ctx.current.canvas.width,
      ctx.current.canvas.height
    );
  };

  const download = async () => {
    const image = canvasRef.current.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
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
      <div style={customColorContainer} onClick={() => setSelectedColor(color)}>
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

  const renderColorCircle = (color) => {
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
      <div style={circleStyle} onClick={() => setSelectedColor(color)}></div>
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
          {colors.map((color) => renderColorCircle(color))}
        </div>
        <div>{renderCustomColor("#FFFFFF")}</div>
      </div>
    );
  };

  const renderBrushSizeSelector = () => {
    const handleBrushSizeChange = (event) => {
      setBrushSize(event.target.value);
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

              "::webkit-slider-thumb": thumbStyles,
              "::-moz-range-thumb": thumbStyles,
              "::-ms-thumb": thumbStyles,
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
          onClick={() => setSelectedTool("pen")}
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
          onClick={() => setSelectedTool("eraser")}
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
    <div style={styles.componentBlock}>
      <div style={styles.drawingWindowHeader}>
        <span
          style={{
            margin: 3,
            marginLeft: 10,
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          Untitled.eth
        </span>
        <div style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
          <ImMinus
            style={{ marginTop: 6, marginRight: 5, cursor: "pointer" }}
          ></ImMinus>
          <ImCross style={{ cursor: "pointer" }}></ImCross>
        </div>
      </div>
      <div style={styles.drawingWindowContent}>
        <canvas
          style={{
            border: "3px solid #000",
            borderRadius: 5,
          }}
          width={500}
          height={500}
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        />
        <br />
        <div style={styles.toolsBlock}>
          {renderBrushSizeSelector()}
          {renderColorSelector()}
          {renderToolSelector()}
          <button
            style={{
              borderRadius: 5,
              borderWidth: "2px",
              backgroundColor: "#B8DCB8",
              boxShadow: "3px 3px",
              padding: 10,
              fontFamily: "Inter",
              fontWeight: 700,
            }}
          >
            Create my NFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawingComponent;
