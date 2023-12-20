import React, { useState,  useRef } from "react";
import PropTypes from 'prop-types';
import "../styles/WellPlate.css"
import { Tooltip } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
/**
 * WellPlate component that allow the user to select wells 
 * in a generic well plate 
 */
const WellPlate = (props) => {
  const [selectedWells, setSelectedWells] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const selectionStartRef = useRef(null);
  const ctrlKeyRef = useRef(false);

  const handleWellClick = (wellId, ctrlKey) => {
    if (ctrlKey) {
      // Toggle selection for individual wells when Ctrl key is held down
      if (selectedWells.includes(wellId)) {
        setSelectedWells((prevSelection) =>
          prevSelection.filter((selectedWell) => selectedWell !== wellId)
        );

      } else {
        setSelectedWells((prevSelection) => [...prevSelection, wellId]);
      }
    } else {
      // Clear selection and select only the clicked well
      setSelectedWells([wellId]);
    }
  };

  const handleMouseDown = (wellId, ctrlKey) => {
    setIsSelecting(true);
    selectionStartRef.current = wellId;
    ctrlKeyRef.current = ctrlKey; // Store Ctrl key state

    if (!ctrlKey) {
      // Clear selection and select only the clicked well when Ctrl key is not held down
      setSelectedWells([wellId]);
    }
  };

  const handleMouseMove = (wellId, ctrlKey) => {
    if (isSelecting) {
      const startRow =
        selectionStartRef.current.charCodeAt(0) - "A".charCodeAt(0);
      const endRow = wellId.charCodeAt(0) - "A".charCodeAt(0);
      const startCol = parseInt(selectionStartRef.current.slice(1)) - 1;
      const endCol = parseInt(wellId.slice(1)) - 1;
      const selectedWellsInRange = [];

      for (
        let row = Math.min(startRow, endRow);
        row <= Math.max(startRow, endRow);
        row++
      ) {
        for (
          let col = Math.min(startCol, endCol);
          col <= Math.max(startCol, endCol);
          col++
        ) {
          const wellIdInRange =
            String.fromCharCode("A".charCodeAt(0) + row) + (col + 1);
          selectedWellsInRange.push(wellIdInRange);
        }
      }

      if (ctrlKey || ctrlKeyRef.current) {
        // If Ctrl key is held down during move, merge selections
        setSelectedWells((prevSelection) => [
          ...prevSelection,
          ...selectedWellsInRange,
        ]);
      } else {
        // Otherwise, replace the selection with the new range
        setSelectedWells(selectedWellsInRange);
      }

      setSelectedWells(selectedWellsInRange);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    selectionStartRef.current = null;
    ctrlKeyRef.current = false;
  };

  const renderWell = (well, index) => {
    const wellId = well.wellId;
    const fileName = well.fileName;

    const isSelected = selectedWells.includes(well.wellId);

    return (
      <Tooltip
        placement="top"
        hasArrow
        label={fileName}
        bg="gray.100"
        color="black"
      >
        <div
          key={wellId}
          className={`well ${isSelected ? "selected" : ""}`}
          onClick={(e) => handleWellClick(well.wellId, e.ctrlKey)}
          onMouseDown={(e) => handleMouseDown(well.wellId, e.ctrlKey)}
          onMouseMove={(e) => handleMouseMove(well.wellId, e.ctrlKey)}
          onMouseUp={handleMouseUp}
        ></div>
      </Tooltip>
    );
  };

  // Generate an array of well IDs (A1, A2, ..., H12)
  const wellIds = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 1; col <= 12; col++) {
      const wellId = String.fromCharCode(65 + row) + col;
      wellIds.push(wellId);
    }
  }

  // well Data
  const platesData = {
    plateId: "StringPlateId",
    FileDir: "StringFileDir",
    WellsData: [],
  };

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columns = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  let count = 0;
  for (const row of rows) {
    for (const col of columns) {
      const wellId = row + col;
      const fileName = `test ${count++}`;
      platesData.WellsData.push({ wellId, fileName });
    }
  }
  return (
    <>
      <Box
        sx={{
          width: 574,
          height: 400,
          borderRadius: 2,
          margin: "auto",
        }}
      >
        <div>
          Selected:{" "}
          {selectedWells.length > 0 ? selectedWells : "not selected any"}
        </div>
        <div className="well-plate">
          {platesData.WellsData.map((well, index) => renderWell(well, index))}
        </div>
      </Box>
    </>
  );
};

export default WellPlate;
