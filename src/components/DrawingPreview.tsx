// React
import React, { useEffect, useRef, useState } from "react";
// Components
import DrawingWindowHeader from "~/components/DrawingWindowHeader.tsx";
import ColorCard from "~/components/ColorCard.tsx";

const DrawingPreview = ({ imageURL, onCloseWindow }) => {
  // Ref
  const canvasPreviewRef = useRef(null);
  // Local State
  const [backgroundColor, setBackgroundColor] = useState("transparent"); // Couleur initiale du background

  // Style
  const styles = {
    previewWindowContainer: {
      display: "flex",
      flexDirection: "column",
      borderStyle: "solid",
      borderRadius: 5,
      borderWidth: 5,
      boxShadow: "10px 10px",
      backgroundColor: "#F2ECDC",
      position: "fixed",
      transform: "translate(-10%, -10%)",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      borderWidth: "3px",
      borderStyle: "solid",
      backgroundColor: "#B8DCB8",
      boxShadow: "3px 3px",
      padding: 10,
      fontFamily: "Inter",
      fontWeight: 700,
      fontSize: 15,
      cursor: "pointer",
    },
  };

  // UseEffect
  useEffect(() => {
    const canvas = canvasPreviewRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      // Dessinez l'image source sur le canvas
      context.fillStyle = backgroundColor; // Utilisez la couleur actuelle du background
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    };

    image.src = imageURL;
  }, [imageURL, backgroundColor]); // Mettez à jour le canvas lorsque la couleur du background change

  // Utils
  const handleColorChange = (color) => {
    setBackgroundColor(color);
  };

  const download = async () => {
    const image = canvasPreviewRef.current.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  };

  return (
    <div
      style={styles.previewWindowContainer}
    >
      <DrawingWindowHeader onCloseWindow={onCloseWindow}></DrawingWindowHeader>
      <div
        style={{ display: "flex", flexDirection: "row", gap: 10, padding: 10 }}
      >
        <div style={{ display: "flex", borderStyle: "solid" }}>
          <canvas ref={canvasPreviewRef} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              maxWidth: 170,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
            <ColorCard onColorChange={handleColorChange}></ColorCard>
          </div>
          <button style={styles.button} onClick={() => download()}>Create NFT</button>
        </div>
      </div>
    </div>
  );
};

export default DrawingPreview;
