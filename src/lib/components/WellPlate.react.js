import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import '../styles/WellPlate.css';
import {Tooltip} from '@chakra-ui/react';
import {Box} from '@chakra-ui/react';
/**
 * WellPlate component that allow the user to select wells
 * in a generic well plate
 */
const WellPlate = (props) => {
    const WellsData = props.WellsData;
    const [selectedWells, setSelectedWells] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const selectionStartRef = useRef(null);
    const ctrlKeyRef = useRef(false);

    const handleWellClick = (wellId, ctrlKey) => {
        if (ctrlKey) {
            // Toggle selection for individual wells when Ctrl key is held down
            if (selectedWells.includes(wellId)) {
                setSelectedWells((prevSelection) =>
                    prevSelection.filter(
                        (selectedWell) => selectedWell !== wellId
                    )
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
                selectionStartRef.current.charCodeAt(0) - 'A'.charCodeAt(0);
            const endRow = wellId.charCodeAt(0) - 'A'.charCodeAt(0);
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
                        String.fromCharCode('A'.charCodeAt(0) + row) +
                        (col + 1);
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
                bg="grey"
                color="black"
            >
                <div
                    key={wellId}
                    className={`well ${isSelected ? 'selected' : ''}`}
                    onClick={(e) => handleWellClick(well.wellId, e.ctrlKey)}
                    onMouseDown={(e) => handleMouseDown(well.wellId, e.ctrlKey)}
                    onMouseMove={(e) => handleMouseMove(well.wellId, e.ctrlKey)}
                    onMouseUp={handleMouseUp}
                ></div>
            </Tooltip>
        );
    };

    const renderPlate = (rows, columns, wellsData) => {
        if (rows === 8 && columns === 12) {
            return (
                <Box
                    sx={{
                        width: 470,
                        borderRadius: 2,
                        margin: 'auto',
                    }}
                >
                    <div style={{paddingBottom: 10}}>
                        Selected:{' '}
                        {selectedWells.length > 0
                            ? `${selectedWells.map((well, _) => well)} `
                            : 'not selected any'}
                    </div>
                    <Box className="border">
                        <Box
                            display="flex"
                            justifyContent="space-around"
                            sx={{marginInlineStart: '14px'}}
                        >
                            <div className="plateTop">1</div>
                            <div className="plateTop">2</div>
                            <div className="plateTop">3</div>
                            <div className="plateTop">4</div>
                            <div className="plateTop">5</div>
                            <div className="plateTop">6</div>
                            <div className="plateTop">7</div>
                            <div className="plateTop">8</div>
                            <div className="plateTop">9</div>
                            <div className="plateTop">10</div>
                            <div className="plateTop">11</div>
                            <div className="plateTop">12</div>
                        </Box>
                        <Box display="flex">
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-around"
                                paddingRight="2px"
                            >
                                <div>A</div>
                                <div>B</div>
                                <div>C</div>
                                <div>D</div>
                                <div>E</div>
                                <div>F</div>
                                <div>G</div>
                                <div>H</div>
                            </Box>
                            <div
                                className={
                                    wellsData.length === 96
                                        ? 'well-plate-96'
                                        : 'well-plate-384'
                                }
                            >
                                {wellsData.map((well, index) =>
                                    renderWell(well, index)
                                )}
                            </div>
                        </Box>
                    </Box>
                </Box>
            );
        } else {
            return null; // Return null or any other fallback content for different row/column combinations
        }
    };

    return <>{renderPlate(props.rows, props.columns, WellsData)}</>;
};
WellPlate.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,
    /**
     * The data used to redner plate
     */
    WellsData: PropTypes.array,
    /**
     * The number used to identify the number of rows in the plate.
     */
    rows: PropTypes.number,
    /**
     * The number used to identify the number of columns in the plate.
     */
    columns: PropTypes.number,
};
export default WellPlate;
