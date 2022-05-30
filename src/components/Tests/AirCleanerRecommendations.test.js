import {fireEvent, render, screen} from '@testing-library/react';
import {AirCleanerRecommendations} from '../AirCleanerRecommendations/AirCleanerRecommendations.js';
import {airCleanersForTesting} from './FindAirCleaner.test.js';

// The different test files are conflicting with each other and can't be run at the same time.
// Please see the TestAirCleaner.test.js file in this directory for instructions on how to run the tests in this file.

/*
const defaultRoomInfo = { 
    roomWidth : 10,
    roomLength: 10,
    floorArea: 100,
    ceilingHeight : 8,
    units : 'feet',
    outdoorVentilation : 'Low'
};

const defaultFilterOptions = {
    maxPrice: -1,
    maxNoise: -1,
    maxPower: -1,
    maxNumAirCleaners: 5
};

// prevents irrelevant console error message when running tests
global.window.scrollTo = () => {};

it('renders basic parts successfully', () => {
    render(<AirCleanerRecommendations roomInfo={defaultRoomInfo} filterOptions={defaultFilterOptions} airCleaners={airCleanersForTesting} />);
    expect(screen.getByText('Recommended Portable Air Cleaners')).toBeTruthy();
    expect(screen.getByText('Sort By:')).toBeTruthy();
    expect(screen.getByText('Filter by:')).toBeTruthy();
});

it('filters air cleaners by price, noise, and power usage correctly', () => {
    const recommendationsScreen = render(<AirCleanerRecommendations roomInfo={defaultRoomInfo} filterOptions={defaultFilterOptions} airCleaners={airCleanersForTesting}/>);

    // filter by price
    const maxPriceInput = screen.getByLabelText('Max Price (U.S dollars)');
    fireEvent.change(maxPriceInput, {target : {value: 300}});
    const maxPriceFilterSubmitButton = screen.getByTestId('max-price-filter-submit-button');
    fireEvent.click(maxPriceFilterSubmitButton);
    expect(recommendationsScreen.container.querySelectorAll('.air-cleaner-list-item').length).toBe(3);

    // clear input
    const clearAllButton = screen.getByRole('button', {name: 'clear all'});
    fireEvent.click(clearAllButton);
    expect(recommendationsScreen.container.querySelectorAll('.air-cleaner-list-item').length).toBe(5);

    // filter by noise
    const maxNoiseInput = screen.getByLabelText('Max Noise (decibels)');
    fireEvent.change(maxNoiseInput, {target : {value: 48.5}});
    const maxNoiseFilterSubmitButton = screen.getByTestId('max-noise-filter-submit-button');
    fireEvent.click(maxNoiseFilterSubmitButton);
    expect(recommendationsScreen.container.querySelectorAll('.air-cleaner-list-item').length).toBe(1);

    fireEvent.click(clearAllButton);

    // filter by power
    const maxPowerInput = screen.getByLabelText('Max Power Usage (Watts)');
    fireEvent.change(maxPowerInput, {target : {value: 55}});
    const maxPowerFilterSubmitButton = screen.getByTestId('max-power-filter-submit-button');
    fireEvent.click(maxPowerFilterSubmitButton);
    expect(recommendationsScreen.container.querySelectorAll('.air-cleaner-list-item').length).toBe(3);

    // filter by additional parameters
    fireEvent.change(maxPriceInput, {target : {value: 200}});
    fireEvent.click(maxPriceFilterSubmitButton);
    expect(recommendationsScreen.container.querySelectorAll('.air-cleaner-list-item').length).toBe(2);
});

it('filters max number of air cleaners correctly', () => {
    let roomInfo = { 
        roomWidth : 20,
        roomLength: 30,
        floorArea: 600,
        ceilingHeight : 8,
        units : 'feet',
        outdoorVentilation : 'Low'
    };
    
    const recommendationsScreen = render(<AirCleanerRecommendations roomInfo={roomInfo} filterOptions={defaultFilterOptions} airCleaners={airCleanersForTesting} />);

    expect(recommendationsScreen.container.querySelectorAll('.air-cleaner-list-item').length).toBe(5);

    const maxNumAirCleanersInput = screen.getByLabelText('Max Number of Air Cleaners to Buy');
    fireEvent.change(maxNumAirCleanersInput, {target : {value: 3}});
    const maxNumAirCleanersSubmitButton = screen.getByTestId('max-num-air-cleaners-filter-submit-button');
    fireEvent.click(maxNumAirCleanersSubmitButton);
    expect(recommendationsScreen.container.querySelectorAll('.air-cleaner-list-item').length).toBe(4);

    fireEvent.change(maxNumAirCleanersInput, {target : {value: 1}});
    fireEvent.click(maxNumAirCleanersSubmitButton);
    expect(recommendationsScreen.container.querySelectorAll('.air-cleaner-list-item').length).toBe(2);

    const clearAllButton = screen.getByRole('button', {name: 'clear all'});
    fireEvent.click(clearAllButton);
    expect(recommendationsScreen.container.querySelectorAll('.air-cleaner-list-item').length).toBe(5);
});

it('sorts air cleaners correctly', () => {
    render(<AirCleanerRecommendations roomInfo={defaultRoomInfo} filterOptions={defaultFilterOptions} airCleaners={airCleanersForTesting} />);
    const sortAirCleanerDropdown = screen.getByLabelText('Sort By:');

    // make sure list of air cleaners is sorted by price by default
    let prices = screen.getAllByTestId('air-cleaner-price');
    let prevPrice = parseFloat(prices[0].textContent.substring(prices[0].textContent.indexOf('$') + 1));
    for (let i = 1; i < prices.length; i++) {
        let price = parseFloat(prices[i].textContent.substring(prices[i].textContent.indexOf('$') + 1));
        
        if (price < prevPrice) {
            throw new Error('Air cleaner list is not sorted by price when it should be');
        }
        prevPrice = price;
    };

    // sort by noise
    fireEvent.change(sortAirCleanerDropdown, {target: {value: 'noise'}})

    const noiseLevels = screen.getAllByTestId('air-cleaner-noise');
    let prevNoise;
    if (noiseLevels[0].textContent.includes('Not available')) {
        prevNoise = -1;
    } else {
        prevNoise = parseFloat(noiseLevels[0].textContent.slice(noiseLevels[0].textContent.indexOf(':') + 2, -3));
    }

    for (let i = 1; i < noiseLevels.length; i++) {
        if (noiseLevels[i].textContent.includes('Not available')) {
            prevNoise = -1;
            continue;
        }
        if (prevNoise === -1) {
            throw new Error('Air cleaner with unavailable noise is not last in list when sorted by noise');
        }

        let noise = parseFloat(noiseLevels[i].textContent.slice(noiseLevels[i].textContent.indexOf(':') + 2, -3));
        if (noise < prevNoise) {
            throw new Error('Air cleaner list is not sorted by noise when it should be');
        }
        prevNoise = noise;
    };

    // sort by ACH
    fireEvent.change(sortAirCleanerDropdown, {target: {value: 'ach'}})
    const achs = screen.getAllByTestId('air-cleaner-ach');

    let prevACH = parseFloat(achs[0].textContent.substring(achs[0].textContent.indexOf(':') + 2));
    for (let i = 1; i < achs.length; i++) {
        let ach = parseFloat(achs[i].textContent.substring(achs[i].textContent.indexOf(':') + 2));        
        if (ach > prevACH) {
            throw new Error('Air cleaner list is not sorted by ACH when it should be');
        }
        prevACH = ach;
    };

    // sort by price again
    fireEvent.change(sortAirCleanerDropdown, {target: {value: 'price'}})

    prices = screen.getAllByTestId('air-cleaner-price');
    prevPrice = parseFloat(prices[0].textContent.substring(prices[0].textContent.indexOf('$') + 1));
    for (let i = 1; i < prices.length; i++) {
        let price = parseFloat(prices[i].textContent.substring(prices[i].textContent.indexOf('$') + 1));

        if (price < prevPrice) {
            throw new Error('Air cleaner list is not sorted by price when it should be');
        }
        prevPrice = price;
    };
});*/