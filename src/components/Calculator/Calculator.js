import "./Calculator.css";
import {RoomDimensionsInput} from "./RoomDimensionsInput.js";
import {RoomVentilationInput} from "./RoomVentilationInput.js";
import {AirCleanerCADRInput} from "./AirCleanerCADRInput.js";
import {RoomDensityInput} from "./RoomDensityInput.js";

export function Calculator(props) {
    function getTitle() {
        return props.calculatorType === "find" ? "Find Air Cleaner" : "Test Air Cleaner Efficiency";
    }

    function showResults() {
        if (inputIsValid()) {
            props.onShowResult(props.calculatorType);
        } 
        window.scrollTo(0, 0);
    }

    // Not the best way to do this ... should clean this up
    function inputIsValid() {
        let foundError = false;

        if (props.roomInfo.floorArea === 0) {
            document.getElementById("error-floor-area").style.display = "block";
            foundError = true;
        } else {
            document.getElementById("error-floor-area").style.display = "none";
        }

        if (props.roomInfo.ceilingHeight === 0) {
            document.getElementById("error-ceiling-height").style.display = "block";
            foundError = true;
        } else {
            document.getElementById("error-ceiling-height").style.display = "none";
        }

        if (props.roomInfo.outdoorVentilation === '') {
            document.getElementById("error-ventilation").style.display = "block";
            foundError = true;
        } else {
            document.getElementById("error-ventilation").style.display = "none";
        }

        if (props.calculatorType === "test") {
            if (props.airCleanerInfo.cadr === 0) {
                document.getElementById("error-cadr").style.display = "block";
                foundError = true;
            } else {
                document.getElementById("error-cadr").style.display = "none";
            }
        }
        if (foundError) {
            return false;
        }
        return true;
    }

    return (
        <div id="calculator-wrapper">
            <h2 id="calculator-title">{getTitle()}</h2>
            <h3 className="step-title">Step 1: Room Dimension</h3>
            <div> 
                <RoomDimensionsInput unitSelectionMade={props.unitSelectionMade} roomWidthEntered={props.roomWidthEntered} roomLengthEntered={props.roomLengthEntered} 
                ceilingHeightEntered={props.ceilingHeightEntered} floorAreaEntered={props.floorAreaEntered} roomInfo={props.roomInfo} calculatorType={props.calculatorType} />
            </div>
            <h3 className="step-title">Step 2: Ventilation Rating</h3>
            <div>
                <RoomVentilationInput updateOutdoorVentilation={props.updateOutdoorVentilation} outdoorVentilation={props.roomInfo.outdoorVentilation}/>
            </div>
            {props.calculatorType === "test" &&
            <div>
                <h3 className="step-title">Step 3: Clean Air Delivery Rate (CADR)</h3>
                <AirCleanerCADRInput updateCADR={props.updateCADR} updateModelName={props.updateModelName} updateNumOwned={props.updateNumOwned} airCleanerInfo={props.airCleanerInfo} airCleaners={props.airCleaners}/>
            </div>}
            <h3 className="step-title"> {props.calculatorType === "find" ? "Step 3: Occupant Density" : "Step 4: Occupant Density"}</h3>
            <div>
                <RoomDensityInput updateRoomType={props.updateRoomType} updateMaxOccupancy={props.updateMaxOccupancy} updateAveOccupancy={props.updateAveOccupancy} 
                updateCurrPercentOccupancyGuideline={props.updateCurrPercentOccupancyGuideline} updateCurrPhase={props.updateCurrPhase} roomInfo={props.roomInfo}/>
            </div>
            <div id="button-wrapper">
                <button id="results-btn" onClick={() => showResults()}>VIEW RESULTS</button>
            </div>
        </div>
    )
}