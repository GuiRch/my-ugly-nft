// React
import React, { useCallback, useEffect, useRef, useState } from "react";
// Utils
import { darken, lighten } from "polished";
// Components
import ColorCard from "~/components/ColorCard.tsx";
import DrawingWindowHeader from "~/components/DrawingWindowHeader.tsx";

const DrawingPreview = ({ imageURL, onCloseWindow }) => {
  const canvasPreviewRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState("transparent"); // Couleur initiale du background

  useEffect(() => {
    const canvas = canvasPreviewRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      // Assurez-vous que le canvas a les mêmes dimensions que l'image source
      canvas.width = image.width;
      canvas.height = image.height;

      // Dessinez l'image source sur le canvas
      context.fillStyle = backgroundColor; // Utilisez la couleur actuelle du background
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    };

    image.src = imageURL;
  }, [imageURL, backgroundColor]); // Mettez à jour le canvas lorsque la couleur du background change

  const handleColorChange = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 700,
        height: 600,
        borderStyle: "solid",
        borderRadius: 5,
        borderWidth: 5,
        boxShadow: "10px 10px",
        backgroundColor: "#F2ECDC",
        position: "fixed",
        transform: "translate(-10%, -10%)",
      }}
    >
      <DrawingWindowHeader
        onCloseWindow={onCloseWindow}
      ></DrawingWindowHeader>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <div style={{ borderStyle: "solid", flex: 2 }}>
          <canvas ref={canvasPreviewRef} />
        </div>
        <div style={{ borderStyle: "solid", flex: 1 }}>
          <ColorCard
            color={"#FFFFFF"}
            onColorChange={handleColorChange}
          ></ColorCard>
          <ColorCard
            color={"#000000"}
            onColorChange={handleColorChange}
          ></ColorCard>
          <ColorCard
            color={"transparent"}
            onColorChange={handleColorChange}
          ></ColorCard>
        </div>
      </div>
    </div>
  );
};

export default DrawingPreview;
