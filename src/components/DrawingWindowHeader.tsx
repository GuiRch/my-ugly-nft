import React from "react";
import { ImCross, ImMinus } from "react-icons/im";

const DrawingWindowHeader = ({ onCloseWindow }) => {
  const styles = {
    drawingWindowHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderStyle: "solid",
      borderWidth: "0px 0px 5px 0px",
      background: "#B8DCB8",
    },
    drawingWindowHeaderTitle: {
      margin: 3,
      marginLeft: 10,
      fontFamily: "Inter",
      fontWeight: 700,
      fontSize: 15,
    },
    drawingWindowHeaderIconBox: {
      display: "flex",
      alignItems: "center",
      marginRight: 10,
    },
    drawingWindowHeaderIcon: {
      marginTop: 6,
      marginRight: 5,
      cursor: "pointer",
    },
    drawingWindowContent: {
      display: "flex",
      padding: 10,
      gap: 10,
      background: "#F2ECDC",
    },
  };

  return (
    <div style={styles.drawingWindowHeader}>
      <span style={styles.drawingWindowHeaderTitle}>Untitled.nft</span>
      <div style={styles.drawingWindowHeaderIconBox}>
        <ImMinus style={styles.drawingWindowHeaderIcon}></ImMinus>
        <ImCross
          style={{ cursor: "pointer" }}
          onClick={() => onCloseWindow()}
        ></ImCross>
      </div>
    </div>
  );
};

export default DrawingWindowHeader;
