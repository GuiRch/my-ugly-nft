// React
import React, {
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
// Utils
import { darken, lighten } from "polished";
// Icons
import { FaEraser, FaPencilAlt } from "react-icons/fa";
// Components
import DrawingTools from "~/components/DrawingTools.tsx";
import DrawingPreview from "~/components/DrawingPreview.tsx";
import ColorCard from "~/components/ColorCard.tsx";
import DrawingWindowHeader from "~/components/DrawingWindowHeader.tsx";

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

const DrawingComponent = forwardRef((props, ref) => {
  // Refs
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  // Local State
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [brushSize, setBrushSize] = useState(5);
  const [selectedTool, setSelectedTool] = useState("pen");
  const [showDrawingPreview, setShowDrawingPreview] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0,
  });

  // Handle Drawing tools props
  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
  };

  const handleBrushSizeChange = (newSize) => {
    setBrushSize(newSize);
  };

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  const handleDrawingPreview = () => {
    setShowDrawingPreview(true);
  };

  const handleCloseWindow = () => {
    setShowDrawingPreview(false);
  };

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
      filter: "blur(4px)",
    },
    drawingWindowContent: {
      display: "flex",
      padding: 10,
      gap: 10,
      background: "#F2ECDC",
    },
    canvas: { border: "3px solid #000", borderRadius: 5 },
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

  useImperativeHandle(ref, () => ({
    handleClear: clear,
    handleDownload: download,
  }));

  return (
    <>
      <div
        style={{
          ...styles.componentBlock,
          filter: showDrawingPreview ? "blur(4px)" : null,
        }}
      >
        <DrawingWindowHeader></DrawingWindowHeader>
        <div style={styles.drawingWindowContent}>
          <canvas
            style={styles.canvas}
            width={500}
            height={500}
            ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
          />
          <br />
          <DrawingTools
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            brushSize={brushSize}
            onBrushSizeChange={handleBrushSizeChange}
            onToolChange={handleToolChange}
            selectedTool={selectedTool}
            onDrawingPreview={handleDrawingPreview}
          ></DrawingTools>
        </div>
      </div>
      {showDrawingPreview ? (
        <DrawingPreview
          imageURL={canvasRef.current.toDataURL("image/png")}
          onCloseWindow={handleCloseWindow}
        ></DrawingPreview>
      ) : null}
    </>
  );
});

export default DrawingComponent;
