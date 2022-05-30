import { useState, useEffect } from 'react';
import { Calculator } from './Calculator.js';
import { RoomSizeRec } from '../RoomSizeRec/RoomSizeRec.js';
import { AirCleanerRecommendations } from '../AirCleanerRecommendations/AirCleanerRecommendations.js';
import './CalculatorManager.css';
import phase_data from '../../phase_data.json'

import data from '../../air_cleaner_list.csv';
import * as d3 from 'd3';

export function CalculatorManager(props) {
    let roomInfoInit = {
        roomWidth : 0,
        roomLength: 0,
        floorArea: 0,
        ceilingHeight : 0,
        units : 'feet',
        outdoorVentilation : '',
        roomType : '',
        maxOccupancy : 0,
        aveOccupancy : 0,
        currPhase : '',
        currPercentOccupancyGuideline : 0,
        recommendedOccupancy : 0
    };
    let airCleanerInfoInit = {
        modelName : '',
        cadr : 0,
        numOwned : 1
    };
    const hideComponentPrefix = 'hidden_';

    const [roomInfo, setRoomInfo] = useState(roomInfoInit);
    const [airCleanerInfo, setAirCleanerInfo] = useState(airCleanerInfoInit);
    const [resultType, setResultType] = useState(null);
    const [calculatorType, setCalculatorType] = useState(props.location.state === undefined ? null : props.location.state.calculatorType);
    // props.airCleaners will always be undefined in production, but this allows us to pass in specific air cleaners for testing.
    const [airCleaners, setAirCleaners] = useState(props.airCleaners === undefined ? null : props.airCleaners);

    useEffect(() => {
        async function getAirCleaners() {
            const result = await d3.csv(data, (d) => {
                return {
                    name: d['Name'],
                    cadr: +d['CADR (smoke)'],
                    priceOfOneAirCleaner: d['Price (USD)'] === '' ? -1 : +d['Price (USD)'],
                    noise: d['Noise Rating (db)'] === '' ? -1 : +d['Noise Rating (db)'],
                    power: d['Power (W)'] === '' ? -1 : +d['Power (W)'],
                    size: d['Size (in)'],
                    link: d['Link'],
                    imageLink: d['Image Link']
                }
            });
            setAirCleaners(result);
        }
        if (airCleaners === null) {
            getAirCleaners();
        }
    });

    function requiredInputsEnteredForOccupancyRecommendation() {
        return (roomInfo.roomType !== "" && roomInfo.aveOccupancy !== 0 && roomInfo.maxOccupancy !== 0 &&
               (roomInfo.currPhase !== "" || roomInfo.currPercentOccupancyGuideline !== 0));
    }

    function getMaxPercentOccupancy(roomType, phase) {
        let phaseData = phase_data["phase_data"];
        for (let i = 0; i < phaseData.length; i++) {
            if (phaseData[i].name === roomType) {
                return phaseData[i]["phase" + phase + "MaxPercentOccupancy"];
            }
        }
    }

    function getMaxOccupancy(roomType, phase) {
        let phaseData = phase_data["phase_data"];
        for (let i = 0; i < phaseData.length; i++) {
            if (phaseData[i].name === roomType) {
                return phaseData[i]["phase" + phase + "MaxOccupancy"];
            }
        }
    }

    function getRecommendedOccupancy() {
        if (!requiredInputsEnteredForOccupancyRecommendation) {
            return -1;
        }
        let recommendedOccupancy = 0;
        if (roomInfo.currPhase !== "") {
            let maxPercentOccupancy;
            let maxOccupancy;
            if (roomInfo.currPhase === "1" || roomInfo.currPhase === "2" || roomInfo.currPhase === "3") {
                maxPercentOccupancy = getMaxPercentOccupancy(roomInfo.roomType, roomInfo.currPhase);
                maxOccupancy = getMaxOccupancy(roomInfo.roomType, roomInfo.currPhase);
            } else {
                return roomInfo.maxOccupancy;
            }
            
            if (maxOccupancy !== undefined) { // max occupancy doesn't exist for every space type, max percent occupany does
                let occupancyPercentCalc = (maxPercentOccupancy / 100) * roomInfo.maxOccupancy;
                if (occupancyPercentCalc < maxOccupancy ? recommendedOccupancy = occupancyPercentCalc : recommendedOccupancy = maxOccupancy);
            } else {
                recommendedOccupancy = (maxPercentOccupancy / 100) * roomInfo.maxOccupancy;
            }
        } else {
            recommendedOccupancy = (roomInfo.currPercentOccupancyGuideline / 100) * roomInfo.maxOccupancy;
        }
        return Math.floor(recommendedOccupancy);
    }


    function showResults(type) {
        updateRecommendedOccupancy(getRecommendedOccupancy());
        setResultType(type);
        setCalculatorType(hideComponentPrefix + calculatorType);
    }
    
    function unitSelectionMade(unitType) {
        let newRoomInfo = roomInfo; 
        newRoomInfo.units = unitType;
        setRoomInfo(newRoomInfo)
    }

    function roomWidthEntered(width) {
        let newRoomInfo = roomInfo;
        newRoomInfo.roomWidth = width;
        setRoomInfo(newRoomInfo);
    }

    function roomLengthEntered(length) {
        let newRoomInfo = roomInfo;
        newRoomInfo.roomLength = length;
        setRoomInfo(newRoomInfo);
    }

    function floorAreaEntered(area, length, width) {
        let newRoomInfo = roomInfo;
        newRoomInfo.roomWidth = width;
        newRoomInfo.roomLength = length;
        newRoomInfo.floorArea = area;
        setRoomInfo(newRoomInfo);
    }

    function ceilingHeightEntered(height) {
        let newRoomInfo = roomInfo;
        newRoomInfo.ceilingHeight = height;
        setRoomInfo(newRoomInfo);
    }

    function updateOutdoorVentilation(ventilationLevel) {
        let newRoomInfo = roomInfo;
        newRoomInfo.outdoorVentilation = ventilationLevel;
        setRoomInfo(newRoomInfo);
    }

    function updateRoomType(roomType) {
        let newRoomInfo = roomInfo;
        newRoomInfo.roomType = roomType;
        setRoomInfo(newRoomInfo);
    }

    function updateMaxOccupancy(maxOccupancy) {
        let newRoomInfo = roomInfo;
        newRoomInfo.maxOccupancy = maxOccupancy;
        setRoomInfo(newRoomInfo);
    }

    function updateAveOccupancy(aveOccupancy) {
        let newRoomInfo = roomInfo;
        newRoomInfo.aveOccupancy = aveOccupancy;
        setRoomInfo(newRoomInfo);
    }

    function updateCurrPhase(currPhase) {
        let newRoomInfo = roomInfo;
        newRoomInfo.currPhase = currPhase;
        setRoomInfo(newRoomInfo);
    }

    function updateCurrPercentOccupancyGuideline(currPercentOccupancyGuideline) {
        let newRoomInfo = roomInfo;
        newRoomInfo.currPercentOccupancyGuideline = currPercentOccupancyGuideline;
        setRoomInfo(newRoomInfo);
    }

    function updateRecommendedOccupancy(recommendedOccupancy) {
        let newRoomInfo = roomInfo;
        newRoomInfo.recommendedOccupancy = recommendedOccupancy;
        setRoomInfo(newRoomInfo);
    }

    function updateCADR(cadr) {
        let newAirCleanerInfo = airCleanerInfo;
        newAirCleanerInfo.cadr = cadr;
        setAirCleanerInfo(newAirCleanerInfo);
    }

    function updateModelName(modelName, cadr) {
        let newAirCleanerInfo = airCleanerInfo;
        newAirCleanerInfo.modelName = modelName;
        newAirCleanerInfo.cadr = cadr;
        setAirCleanerInfo(newAirCleanerInfo);
    }

    function updateNumOwned(num) {
        let newAirCleanerInfo = airCleanerInfo;
        newAirCleanerInfo.numOwned = num;
        setAirCleanerInfo(newAirCleanerInfo);
    }

    function backToCalculator() {
        setResultType(null);
        if (calculatorType.substring(7) === "hidden_test") {
            setCalculatorType("find");
        } else {
            setCalculatorType(calculatorType.substring(hideComponentPrefix.length));
        }
    }

    return (
        <div>
            {(calculatorType === 'find' || (airCleaners !== null && calculatorType === 'test')) && 
                <Calculator calculatorType={calculatorType} roomInfo={roomInfo} airCleanerInfo={airCleanerInfo} unitSelectionMade={unitSelectionMade}
                roomWidthEntered={roomWidthEntered} roomLengthEntered={roomLengthEntered} floorAreaEntered={floorAreaEntered} ceilingHeightEntered={ceilingHeightEntered}
                 updateCADR={updateCADR} onShowResult={showResults} updateOutdoorVentilation={updateOutdoorVentilation} updateRoomType={updateRoomType} 
                 updateMaxOccupancy={updateMaxOccupancy} updateAveOccupancy={updateAveOccupancy} updateCurrPhase={updateCurrPhase} updateCurrPercentOccupancyGuideline={updateCurrPercentOccupancyGuideline}
                 updateModelName={updateModelName} updateNumOwned={updateNumOwned} airCleaners={airCleaners}/>}
            {resultType === 'find' && airCleaners !== null && <AirCleanerRecommendations roomInfo={roomInfo} setCalculatorType={setCalculatorType} backToCalculator={backToCalculator} airCleaners={airCleaners}/>}
            {resultType === 'test' && <RoomSizeRec roomInfo={roomInfo} airCleanerInfo={airCleanerInfo} showResults={showResults} backToCalculator={backToCalculator} />}
        </div>
    );
}