import "./Calculator.css";
import { useState } from "react";
import CadrImg from '../../images/cadr_clipart.png';
import React from "react";
import ReactToolTip from "react-tooltip";

export function AirCleanerCADRInput(props) {

    const [cadr, setCadr] = useState(props.airCleanerInfo.cadr === 0 ? "" : props.airCleanerInfo.cadr);
    const [modelName, setModelName] = useState(props.airCleanerInfo.modelName === "" ? "" : props.airCleanerInfo.modelName);
    const [numOwned, setNumOwned] = useState(props.airCleanerInfo.numOwned === 0 ? "" : props.airCleanerInfo.numOwned)

    function createSelectItems(airCleaners) {
        let items = [];  
        items.push(<option></option>);
        
        for (let i = 0; i <= airCleaners.length - 2; i++) {   
            let cadr = airCleaners[i].cadr;
            let name = airCleaners[i].name;      
            items.push(<option value={cadr}>{name}</option>);   
        }
        items.push(<option value={0}>I'm not sure</option>);
        return items;
    }

    function checkIfNumber(value) {
        const re = /^[0-9\b]+$/
        if (value === '' || re.test(value)) { 
            return true;
        }
        return false;
    }

    return (
        <div>
            <p className="helptext">If you are unsure of your cleaner’s model name, then input the CADR value of your air cleaner. It is commonly listed at the bottom of the air cleaner on the specifications sticker.</p>
            <div className="step-wrapper">
                <div className="input-wrapper">
                        <label htmlFor="air-cleaner-selection" className="input-title">Air Cleaner Model Name</label>
                    <ReactToolTip id="cadr-model-tooltip" place="right" effect="solid" multiline={true}>If you are unsure of your cleaner’s model name, then input the CADR value of your air cleaner. It is commonly listed at the bottom of the air cleaner on the specifications sticker.</ReactToolTip>
                    <select className="user-input" id="air-cleaner-selection" data-tip data-for="cadr-model-tooltip" onChange={(e) => {
                            setModelName(e.target.selectedOptions[0].label);
                            setCadr(e.target.value);
                            props.updateModelName(e.target.selectedOptions[0].label, e.target.value);
                    }}>
                        {createSelectItems(props.airCleaners)}
                    </select>
                    <ReactToolTip id="cadr-value-tooltip" place="right" effect="solid" multiline={true}>The clean air delivery rate (CADR) of your air cleaner can often be found on the bottom of the air cleaner. If not, an online search of the model name should return the CADR value.</ReactToolTip>
                    <label htmlFor="cadr-input" className="input-title">CADR of Air Cleaner <span className="required">*</span></label>
                    <input className="user-input" id="cadr-input" data-tip data-for="cadr-value-tooltip" onChange={(e) => {
                        let value = e.target.value;
                        if (checkIfNumber(value)) {
                            setCadr(value);
                            props.updateCADR(parseInt(value));
                        }
                    }} value={cadr} />
                    <p className="error-message" id="error-cadr">Please enter a CADR value.</p>
                    <label htmlFor="num-aircleaners-input" className="input-title">Number of these Air Cleaners</label>
                    <input className="user-input" id="num-aircleaners-input" onChange={(e) => {
                        let value = e.target.value;
                        if (checkIfNumber(value)) {
                            setNumOwned(value)
                            props.updateNumOwned(value);
                        }
                    }} value={numOwned} type="number" />
                </div>
                <img src={CadrImg} alt="Clean Air Delivery Rate Clipart" id="img-cadr" />
            </div>
        </div>
    )
}