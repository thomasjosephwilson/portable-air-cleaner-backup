import './RoomSizeRec.css';
import GaugeChart from 'react-gauge-chart';

export function RoomSizeRec(props) {

    const achColors = {
        veryLow: "#FF0D0D",
        bareMinimum: "#FF8E15",
        ok: "#FAB733",
        good: "#ACB334",
        ideal: "#69B34C"
    };

    const ventilationToACH = {
        'Poor' : 1,
        'Typical' : 1.5,
        'Good' : 3,
        'Enhanced' : 4
    };

    function achToMessage(ach) {
        if (ach < 3) {
            return "VERY LOW";
        } else if (ach < 4) {
            return "BARE MINIMUM";
        } else if (ach < 5) {
            return "OKAY";
        } else if (ach < 6) {
            return "GOOD";
        } else {
            return "IDEAL";
        }
    }

    function getACH() {
        if (props.roomInfo.units === "feet") {
            return (((Math.round((props.airCleanerInfo.cadr * 60 / (props.roomInfo.floorArea * props.roomInfo.ceilingHeight)) * 10) / 10)) * props.airCleanerInfo.numOwned) + ventilationToACH[props.roomInfo.outdoorVentilation]
        } else {
            return (((Math.round(((props.airCleanerInfo.cadr / .58) / (props.roomInfo.floorArea * props.roomInfo.ceilingHeight)) * 10) / 10)) * props.airCleanerInfo.numOwned) + ventilationToACH[props.roomInfo.outdoorVentilation]
        }
    }

    function getPercent() {
        let ach = getACH();
        if (ach <= 3) {
            return ach / 15;
        } else if (ach <= 4) {
            return ach / 10.26;
        } else if (ach <= 5) {
            return ach / 8.62;
        } else if (ach <= 6) {
            return ach / 7.79;
        } else {
            return .77 + (.01 * ach)
        }
    }

    function getACHColor(ach) {
        if (ach < 3) {
            return achColors.veryLow;
        } else if (ach < 4) {
            return achColors.bareMinimum;
        } else if (ach < 5) {
            return achColors.ok;
        } else if (ach < 6) {
            return achColors.good;
        } else {
            return achColors.ideal;
        }
    }

    function calculateRoomSize() {
        let totalCFM = 0;
        if (props.roomInfo.units === "feet") {
            totalCFM = ((ventilationToACH[props.roomInfo.outdoorVentilation] * (props.roomInfo.floorArea * props.roomInfo.ceilingHeight)) / 60) + parseFloat(props.airCleanerInfo.cadr);
            return Math.floor((totalCFM * 60) / (5 * props.roomInfo.ceilingHeight));
        } else {
            totalCFM = ((ventilationToACH[props.roomInfo.outdoorVentilation] * props.roomInfo.floorArea * props.roomInfo.ceilingHeight * 35.3147) / 60) + parseFloat(props.airCleanerInfo.cadr);
            return Math.floor(((totalCFM*60) / 35.315) / (5 * props.roomInfo.ceilingHeight));
        }
    }

    function getACHText(ach) {
        if (ach > 6) {
            return "Your room is meeting an Ideal level of Air Changes per hour! If you'd still like to see a list of portable air cleaners fit for your room, please click the button below."
        }
        return "Your room is currently not meeting an Ideal level of Air Changes per hour. If you'd like to see a list of our recommended air cleaners for your room, please click the button below."
    }

    function getModelName() {
        if (props.airCleanerInfo.modelName === "I'm not sure") {
            return "N/A";
        }
        return props.airCleanerInfo.modelName;
    }

    function getChartWidth() {
        if (window.innerWidth < 700) {
            return 90;
        } else {
            return 150;
        }
    }

    function getDynamicOccupancyDisclaimerInfo() {
        if (props.roomInfo.currPhase !== '') {
            return "Phase " + props.roomInfo.currPhase + " ";
        }
        return props.roomInfo.currPercentOccupancyGuideline + "% occupancy ";
    }

    const chartStyle = {
        height : getChartWidth()
        // height : 90
    };

    return (
        <div id="roomsizerec-container">
            <div id="roomsizerec-header" unselectable="on">
                <button id='btn-back' onClick={() => {
                    props.backToCalculator();
                }}>{'< Go Back'}</button>
                <p id="roomsizerec-title">Efficiency Dashboard</p>
            </div>
            <div id="roomsizerec-content">
                <div id="roomsizerec-gauge">
                    <h3 id="gauge-chart-description">Is your room meeting the recommended guidelines?</h3>
                    <GaugeChart id="gauge-chart" s
                    tyle={chartStyle}
                    nrOfLevels={5}
                    colors={[achColors.veryLow, achColors.bareMinimum, achColors.ok, achColors.good, achColors.ideal]}
                    arcPadding={0.05}
                    arcsLength={[0.20, 0.19, .19, .19, 0.20]}
                    animate={true}
                    percent={getPercent()}
                    formatTextValue={value => getACH()}
                    textColor={"#00A2C7"}
                    options={{ maintainAspectRatio: false }}
                    />
                    <p id="gauge-footer">Air Changes Per Hour</p>
                    <div id="gauge-result-message" style={{background: getACHColor(getACH())}}>
                        <p id="result-message">{achToMessage(getACH())}</p>
                    </div>
                    <p id="list-btn-text">{getACHText(getACH())}</p>
                    <button id="list-btn" onClick={(e) => {
                        props.showResults("find");
                    }}>Air Cleaner List</button>
                </div>
                <div id="roomsizerec-details">
                    {props.airCleanerInfo.numOwned === 1 &&
                        <div className="details-module">
                            <p className="details-title">Recommended room <br />area of this air cleaner (at your room's ventilation level and ceiling height):</p>
                            <p className="details-value" id="superscript-feet">{calculateRoomSize()} {props.roomInfo.units === "feet" ? "ft" : "m"}<sup>2</sup></p>
                        </div>
                    }
                    {calculateRoomSize() < props.roomInfo.floorArea && props.airCleanerInfo.numOwned === 1 &&
                        <p className="recommendation-text"><span>Note: </span>Our recommended room area for your air cleaner at your ventilation level and ceiling height is smaller than your current room area. You may want to consider purchasing a stronger air cleaner for your space using the 'Air Cleaner List' button below.</p>}
                    <hr className="roomsizerec-hr" />
                    <div className="details-module">
                        <p className="details-title">Ventilation Level:</p>
                        <p className="details-value">{props.roomInfo.outdoorVentilation}</p>
                    </div>
                    <hr className="roomsizerec-hr" />
                    <div className="details-module">
                        <p className="details-title">Model Name:</p>
                        <p className="details-value">{getModelName() === "" ? "N/A" : getModelName()}</p>
                    </div>
                    <hr className="roomsizerec-hr" />
                    <div className="details-module">
                        <p className="details-title">Clean Air Delivery Rate:</p>
                        <p className="details-value">{props.airCleanerInfo.cadr}</p>
                    </div>
                    <hr className="roomsizerec-hr" />
                    <div className="details-module">
                        <p className="details-title">Average Number of <br />People in Your Room:</p>
                        <p className="details-value">{props.roomInfo.aveOccupancy === 0 ? "N/A" : props.roomInfo.aveOccupancy + " Persons"}</p>
                    </div>
                    <hr className="roomsizerec-hr" />
                    {props.roomInfo.recommendedOccupancy === -1 && props.roomInfo.maxOccupancy === 0 && 
                    <div className="details-module">
                        <p className="details-title">Occupancy <br /> Recommendation:</p>    
                        <p className="details-value">{"N/A"}</p>
                    </div>}
                    {props.roomInfo.recommendedOccupancy === -1 && props.roomInfo.maxOccupancy !== 0 && 
                    <div>    
                        <p className="details-title">Occupancy Recommendation:</p>
                        <table>
                            <tr>
                                <th>25% Occupancy</th>
                                <th>50% Occupancy</th>
                                <th>75% Occupancy</th>
                                <th>100% Occupancy</th>
                            </tr>
                            <tr>
                                <td>{Math.floor(props.roomInfo.maxOccupancy * .25)}</td>
                                <td>{Math.floor(props.roomInfo.maxOccupancy * .50)}</td>
                                <td>{Math.floor(props.roomInfo.maxOccupancy * .75)}</td>
                                <td>{Math.floor(props.roomInfo.maxOccupancy * 1)}</td>
                            </tr>
                        </table>
                        <p className="recommendation-text"><span>Note: </span>Please refer to your current county/state phase's occupancy guidelines for the above table. Washington State's current phase can be found <a href="https://coronavirus.wa.gov/what-you-need-know/county-status-and-safe-start-application-process" target="_blank" rel="noreferrer">here.</a> If your average number of people is greater than the value above we recommend purchasing an air cleaner with at least 6 air changes per hour for your room.</p>
                    </div>}
                    {props.roomInfo.recommendedOccupancy !== -1 &&
                    <div className="details-module">
                        <p className="details-title">Occupancy <br /> Recommendation:</p>    
                        <p className="details-value">{isNaN(props.roomInfo.recommendedOccupancy) ? "N/A" : props.roomInfo.recommendedOccupancy + " Persons"}</p>
                    </div>}
                    {props.roomInfo.recommendedOccupancy !== -1 && props.roomInfo.aveOccupancy > props.roomInfo.recommendedOccupancy &&
                        <p className="recommendation-text"><span>Note: </span>Your space's average occupancy is greater than
                        the recommended occupancy based on <span>{getDynamicOccupancyDisclaimerInfo()}</span> 
                        guidelines for your space. The air quality estimate on this page is being
                        made with the assumption that your room's occupancy meets current occupancy
                        guidelines. For more information about occupancy guidelines for your type of space,
                        click <a href='https://www.governor.wa.gov/issues/issues/covid-19-resources/covid-19-reopening-guidance' target="_blank" rel="noreferrer">here</a>.</p>
                    }
                </div>
            </div>
        </div>
    )
}