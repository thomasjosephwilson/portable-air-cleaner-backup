import './Calculator.css';
import { useState } from 'react';
import densityClipArt from '../../images/density_clipart.png';
import React from "react";
import ReactToolTip from "react-tooltip";

export function RoomDensityInput(props) {
    const [roomType, setRoomType] = useState(props.roomInfo.roomType === "" ? "" : props.roomInfo.roomType);
    const [maxOccupancy, setMaxOccupancy] = useState(props.roomInfo.maxOccupancy === 0 ? "" : props.roomInfo.maxOccupancy);
    const [aveOccupancy, setAveOccupancy] = useState(props.roomInfo.aveOccupancy === 0 ? "" : props.roomInfo.aveOccupancy); 
    const [currPhase, setCurPhase] = useState(props.roomInfo.currPhase === "" ? "" : props.roomInfo.currPhase);
    const [currPercentOccupancyGuideline, setCurrPercentOccupancyGuideline] = 
        useState(props.roomInfo.currPercentOccupancyGuideline === 0 ? "" : props.roomInfo.currPercentOccupancyGuideline)

    function checkIfNumber(value) {
        const re = /^[0-9\b]+$/
        if (value === '' || re.test(value)) { 
            return true;
        }
        return false;
    }

    return (
        <div>
            <p className="helptext">This is an optional step that will help determine if your space is too densely occupied according to <a href="https://www.governor.wa.gov/issues/issues/covid-19-resources/covid-19-reopening-guidance" target="_blank" rel="noreferrer">Washington state governor's current COVID-19 occupancy guidelines</a>.</p>
            <div className="step-wrapper">
                <div className="input-wrapper">
                    <label htmlFor="room-type-selection" className="input-title">Room Type</label>
                    <select id="room-type-selection"  className="user-input" value={roomType} onChange={(e) => { 
                        setRoomType(e.target.value)
                        props.updateRoomType(e.target.value);
                    }}>
                        <option disabled selected value=""></option>
                        <option value="bowling">{'Bowling Alleys'}</option>
                        <option value="card_room">{'Card Rooms'}</option>
                        <option value="entertainment">{'Darts, Billiards, Trampoline Parks, Escape Rooms, etc'}</option>
                        <option value="events_indoor">{'Miscellaneous Event Spaces'}</option>
                        <option value="spectator_large">{'Large Spectator Event Spaces'}</option>
                        <option value="spectator_small">{'Spectator Event Spaces'}</option>
                        <option value="professional_services">{'Professional Services (Accountants, Architects, Attorneys, Engineers, Financial Advisors, etc) offices'}</option>
                        <option value="personal_services">{'Personal Services (Cosmetologists, Hairstylists, Barbers, etc) Businesses'}</option>
                        <option value="wedding_funeral_indoor">{'Wedding & Funerals Sites'}</option>
                        <option value="movie_theaters">{'Movie Theaters'}</option>
                        <option value="museum_large">{'Large Museums'}</option>
                        <option value="museum_small">{'Museums'}</option>
                        <option value="domestic_services">{'Home Rooms'}</option>
                        <option value="retail">{'Retail'}</option>
                        <option value="library_large">{'Large Libraries'}</option>
                        <option value="library_small">{'Small Libraries'}</option>
                        <option value="pet_grooming">{'Pet Grooming Salons'}</option>
                        <option value="photography">{'Photography Studios'}</option>
                        <option value="real_estate">{'Real Estate Showings'}</option>
                        <option value="performing_arts_small">{'Performing Arts Venues'}</option>
                        <option value="performing_arts_large">{'Large Performing Arts Venues'}</option>
                        <option value="vessel_sales">{'Vehicle/Vessel Dealerships'}</option>
                        <option value="religious_events_small">{'Religious Events'}</option>
                        <option value="religious_events_large">{'Large Religious Events'}</option>
                        <option value="other_large">{'Other Large Spaces'}</option>
                        <option value="other_small">{'Other Small Spaces'}</option>
                    </select>
                    <ReactToolTip id="density-average-tooltip" place="right" effect="solid" multiline={true}>Please enter the average number of people in your room at peak hours.</ReactToolTip>
                    <label htmlFor="average-occupancy-input" className="input-title">Average Number of <br />People in Room</label>
                    <input id="average-occupancy-input" className="user-input" data-tip data-for="density-average-tooltip" onChange={(e) => {
                        let value = e.target.value;
                        if (checkIfNumber(value)) {
                            setAveOccupancy(parseFloat(value));
                            props.updateAveOccupancy(parseFloat(value));
                        }
                    }} value={isNaN(aveOccupancy) ? '' : aveOccupancy} />
                    <ReactToolTip id="density-maximum-tooltip" place="right" effect="solid" multiline={true}>Please enter the maximum occupancy of your space according to your building code.</ReactToolTip>
                    <label htmlFor="maximum-occupancy-input" className="input-title">Maximum Occupancy</label>
                    <input id="maximum-occupancy-input" className="user-input" data-tip data-for="density-maximum-tooltip" onChange={(e) => {
                        let value = e.target.value;
                        if (checkIfNumber(value)) {
                            setMaxOccupancy(parseFloat(value));
                            props.updateMaxOccupancy(parseFloat(value));
                        }
                    }} value={isNaN(maxOccupancy) ? '' : maxOccupancy} />
                    <hr id="divider" />
                    <ReactToolTip id="density-phase-tooltip" place="right" effect="solid" clickable={true} multiline={true}>Please enter your current COVID-19 phase. The current phase for 
                        Washington State counties can be found by visiting this <a className="tooltip-link" target="_blank" rel="noreferrer" href="https://coronavirus.wa.gov/what-you-need-know/county-status-and-safe-start-application-process">page</a>. </ReactToolTip>
                    <label htmlFor="phase-selection" className="input-title">Current Phase</label>
                    <select id="phase-selection" className="user-input" data-tip data-for="density-phase-tooltip" value={isNaN(currPhase) ? '' : currPhase} onChange={(e) => {
                        setCurPhase(e.target.value);
                        props.updateCurrPhase(e.target.value);
                    }}>
                        <option selected value=""></option>
                        <option value="1">Phase 1</option>
                        <option value="2">Phase 2</option>
                        <option value="3">Phase 3</option>
                        <option value="4">No Occupancy Restrictions</option>
                    </select>
                    <p id="density-or-text">OR</p>
                    <ReactToolTip id="density-occupancy-tooltip" place="right" effect="solid" clickable={true} multiline="true">Enter the current occupancy restriction according to your 
                    state or county COVID-19 regulations. Washington's occupancy guidelines can be found on the <a className="tooltip-link" target="_blank" rel="noreferrer" href="https://coronavirus.wa.gov/what-you-need-know/safe-start/whats-open">Roadmap to Recovery</a>.</ReactToolTip>
                    <label htmlFor="max-occupancy-selection" className="input-title">Current Occupancy <br /> Limit Guideline</label>
                    <select id="max-occupancy-selection" className="user-input" data-tip data-for="density-occupancy-tooltip" 
                        value={isNaN(currPercentOccupancyGuideline) ? '' : currPercentOccupancyGuideline} onChange={(e) => {
                            setCurrPercentOccupancyGuideline(parseFloat(e.target.value));
                        props.updateCurrPercentOccupancyGuideline(parseFloat(e.target.value));
                    }}>
                        <option selected value=""></option>
                        <option value="25">25%</option>
                        <option value="50">50%</option>
                        <option value="75">75%</option>
                        <option value="100">100%</option>
                    </select>
                </div>
                <img src={densityClipArt} id="img-density" alt="density clip art"/>
            </div>
        </div>
    );
}