import './AirCleanerDetails.css';
import {useEffect, useState} from 'react';

import {numAirCleanersNeededLabel} from './AirCleanerListItem.js';
import {achColors} from './AirCleanerListItem.js';

export function AirCleanerDetails(props) {
    const [changeableNumAirCleaners, setChangeableNumAirCleaners] = useState(props.airCleaner.numAirCleaners);
    const [achBasedOnSelectedNumAirCleaners, setAchBasedOnSelectedNumAirCleaners] = useState(props.airCleaner.ach);
    const [priceBasedOnSelectedNumAirCleaners, setPriceBasedOnSelectedNumAirCleaners] = useState(props.airCleaner.price);

    function sizeWithInchMarks(airCleanerSize) {
        const firstInchMarkInsertionLocation = airCleanerSize.indexOf('x') - 1;
        const secondInchMarkInsertionLocation = airCleanerSize.lastIndexOf('x') - 1;
        return airCleanerSize.slice(0, firstInchMarkInsertionLocation) + ' inches' + 
               airCleanerSize.slice(firstInchMarkInsertionLocation, secondInchMarkInsertionLocation) + ' inches' +
               airCleanerSize.slice(secondInchMarkInsertionLocation) + ' inches';
    }

    function updateACHValueColor(ach) {
        const bareMinimumACH = 3;
        const okACH = 4;
        const goodACH = 5;
        const idealACH = 6;

        if (ach >= idealACH) {
            document.querySelector('.color-coded-ach-level').style.color = achColors.ideal;
        } else if (ach >= goodACH) {
            document.querySelector('.color-coded-ach-level').style.color = achColors.good;
        } else if (ach >= okACH) {
            document.querySelector('.color-coded-ach-level').style.color = achColors.ok;
        } else if (ach >= bareMinimumACH) {
            document.querySelector('.color-coded-ach-level').style.color = achColors.bareMinimum;
        } else {
            document.querySelector('.color-coded-ach-level').style.color = achColors.veryLow;
        }
    }

    let estimatedACHLabel = `Estimated air changes per hour ${changeableNumAirCleaners} of these air cleaners would
        give your space (5 is the recommended minimum): `;
    let priceLabel = `Price for ${changeableNumAirCleaners} air cleaners of this type: `;
    let noiseLabel = 'Noise (of each air cleaner): ';
    let powerLabel = 'Power Requirement (of each air cleaner): ';
    let cadrLabel = 'Clean Air Delivery Rate (CADR) of each air cleaner: ';
    let sizeLabel = 'Size (of each air cleaner): ';

    if (changeableNumAirCleaners === 1) {
        estimatedACHLabel = 'Estimated air changes per hour this air cleaner would give your space (5 is the recommended minimum): ';
        priceLabel = 'Price: ';
        noiseLabel = 'Noise: ';
        powerLabel = 'Power Requirement: ';
        cadrLabel = 'Clean Air Delivery Rate (CADR): ';
        sizeLabel = 'Size: ';
    }

    useEffect(() => {
        if (document.querySelector('.color-coded-ach-level').style.color === '') {
            updateACHValueColor(props.airCleaner.ach);
        }
    });

    function handleNumAirCleanersChange(e) {
        if (e.target.value < 1) {
            return;
        }
        let newTotalACH = Math.round((props.airCleaner.achFromOneAirCleaner * e.target.value + props.airCleaner.outdoorVentilation) * 100) / 100.0;
        let newPrice = Math.round(props.airCleaner.priceOfOneAirCleaner * e.target.value * 100) / 100.0;
        setChangeableNumAirCleaners(e.target.value);
        setAchBasedOnSelectedNumAirCleaners(newTotalACH);
        setPriceBasedOnSelectedNumAirCleaners(newPrice);
        updateACHValueColor(newTotalACH);
    }

    return(
        <div id='air-cleaner-details-container'>
            <div id='air-cleaner-details'>
                <div id='air-cleaner-details-header'>
                    <h3>{props.airCleaner.name}</h3>
                    <button id='close-air-cleaner-details-button' onClick={() => {props.closeDetailsClick()}}>Close</button>
                </div>
                <div id='air-cleaner-details-body'>
                    <img className='air-cleaner-details-image' src={props.airCleaner.imageLink} alt={props.airCleaner.name} />
                    <div>
                        <p><strong>Link to buy:</strong> <a href={props.airCleaner.link} target="_blank" rel="noreferrer">Here</a></p>
                        <p><strong>{numAirCleanersNeededLabel}</strong>{props.airCleaner.numAirCleaners}</p>
                        <p>If you used{' '}
                            <input id='change-num-air-cleaners-input' data-testid='change-num-air-cleaners-input' 
                            onChange={(e) => handleNumAirCleanersChange(e)} 
                            defaultValue={props.airCleaner.numAirCleaners} type='number'/>
                            {' '}air cleaners:
                        </p>
                        
                        <p><strong>{estimatedACHLabel}</strong>
                            <span className='color-coded-ach-level'>{achBasedOnSelectedNumAirCleaners}</span>
                        </p>
                        <p><strong>{priceLabel}</strong>${priceBasedOnSelectedNumAirCleaners}</p>
                        <p><strong>{noiseLabel}</strong> {props.airCleaner.noise === -1 ? 'Not available' : props.airCleaner.noise + ' dB'}</p>
                        <p><strong>{powerLabel}</strong> {props.airCleaner.power === -1 ? 'Not available' : props.airCleaner.power + ' W'}</p>
                        <p><strong>{cadrLabel}</strong> {props.airCleaner.cadr} feet<sup>3</sup>/minute</p>
                        <p><strong>{sizeLabel}</strong> {props.airCleaner.size === '' ? 'Not available' : sizeWithInchMarks(props.airCleaner.size)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}