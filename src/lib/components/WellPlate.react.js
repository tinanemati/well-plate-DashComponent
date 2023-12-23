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
    const [selectedWells, setSelectedWells] = useState(props.selectedWells);
    const updateSelection = (newSelection) => {
        setSelectedWells(newSelection);
        props.setProps({...props, selectedWells: newSelection});
    };
    const [isSelecting, setIsSelecting] = useState(false);
    const selectionStartRef = useRef(null);
    const ctrlKeyRef = useRef(false);

    const handleWellClick = (wellId, ctrlKey) => {

        if (ctrlKey) {
            // Toggle selection for individual wells when Ctrl key is held down

            if (selectedWells.includes(wellId)) {
                updateSelection((prevSelection) =>
                    prevSelection.filter(
                        (selectedWell) => selectedWell !== wellId
                    )
                );
            } else {
                updateSelection((prevSelection) => [...prevSelection, wellId]);
            }
        } else {
            // Clear selection and select only the clicked well
            updateSelection([wellId]);
        }
    };

    const handleMouseDown = (wellId, ctrlKey) => {
        setIsSelecting(true);
        selectionStartRef.current = wellId;
        ctrlKeyRef.current = ctrlKey; // Store Ctrl key state

        if (!ctrlKey) {
            // Clear selection and select only the clicked well when Ctrl key is not held down
            updateSelection([wellId]);
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
                updateSelection((prevSelection) => [
                    ...prevSelection,
                    ...selectedWellsInRange,
                ]);
            } else {
                // Otherwise, replace the selection with the new range
                updateSelection(selectedWellsInRange);
            }

            updateSelection(selectedWellsInRange);
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        selectionStartRef.current = null;
        ctrlKeyRef.current = false;
    };

    const renderWell = (well, index, plateType) => {
        const wellId = well.wellId;
        const fileName = well.fileName;

        const isSelected = selectedWells.includes(wellId);

        return (
            <div key={index}>
                <Tooltip
                    placement="top"
                    hasArrow
                    label={fileName}
                    bg="grey"
                    color="black"
                >
                    <div
                        className={`well-${plateType} ${
                            isSelected ? 'selected' : ''
                        }`}
                        onClick={(e) => handleWellClick(wellId, e.ctrlKey)}
                        onMouseDown={(e) => handleMouseDown(wellId, e.ctrlKey)}
                        onMouseMove={(e) => handleMouseMove(wellId, e.ctrlKey)}
                        onMouseUp={handleMouseUp}
                    ></div>
                </Tooltip>
            </div>
        );
    };

    const renderPlate = (rows, columns, wellsData) => {
        if ((rows === 8 && columns === 12) || (rows === 16 && columns === 24)) {
            const plateType = rows === 8 ? '96' : '384';
            const width = rows === 8 ? 470 : 568;

            return (
                <Box
                    sx={{
                        width: width,
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
                            {Array.from({length: columns}, (_, i) => (
                                <div
                                    key={`column-${i}`}
                                    className={`plateTop-${plateType}`}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </Box>
                        <Box display="flex">
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-around"
                                paddingRight="2px"
                            >
                                {Array.from({length: rows}, (_, i) => (
                                    <div key={`row-${i}`}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </Box>
                            <div className={`well-plate-${plateType}`}>
                                {wellsData.map((well, index) =>
                                    renderWell(well, index, plateType)
                                )}
                            </div>
                        </Box>
                    </Box>
                </Box>
            );
        } else {
            return (
                <h1>
                    The number of rows and columns needs to be a combination of
                    8x12 or 16x24.
                </h1>
            );
        }
    };
    return <>{renderPlate(props.rows, props.columns, props.WellsData)}</>;
};
WellPlate.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,
    /**
     * The data used to redner plate
     */
    WellsData: PropTypes.array.isRequired,
    /**
     * The number used to identify the number of rows in the plate.
     */
    rows: PropTypes.number.isRequired,
    /**
     * The number used to identify the number of columns in the plate.
     */
    columns: PropTypes.number.isRequired,
    /**
     * The selected well in plate by user
     */
    selectedWells: PropTypes.array,
};
export default WellPlate;
