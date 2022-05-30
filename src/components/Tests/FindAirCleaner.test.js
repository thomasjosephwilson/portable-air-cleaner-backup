import {fireEvent, render, screen} from '@testing-library/react';
import {CalculatorManager} from '../Calculator/CalculatorManager.js';

export const airCleanersForTesting = [
    {name:'Air cleaner 1', priceOfOneAirCleaner: 167.99, noise: -1, cadr: 68, power: 43, dimensions: '8.46" x 6.93" x 23"'},
    {name:'Air cleaner 2®', priceOfOneAirCleaner: 119.99, noise: -1, cadr: 328, power: 55, dimensions: '12.8" x 6.4" x 16.1"'},
    {name:'Air cleaner 3', priceOfOneAirCleaner: 329.0, noise: 54, cadr: 150, power: 60, dimensions: '13" x 23" x 7"'},
    {name:'Air cleaner 4', priceOfOneAirCleaner: 189.99, noise: 48.3, cadr: 500, power: 60, dimensions: '13.4" x 6.5" x 18.5"'},
    {name:'Air cleaner 5', priceOfOneAirCleaner: 369.95, noise: 48.6, cadr: 211, power: 29, dimensions: '22.2" x 16.6" x 9.8"'}];

// prevents irrelevant console error message when running tests
global.window.scrollTo = () => {};

function getACHFromOneAirCleaner(floorArea, ceilingHeight, units, cadr) {
    if (units === 'feet') {
        return (cadr * 60) / (floorArea * ceilingHeight);
    }
    return (cadr / 0.58) / (floorArea * ceilingHeight);
}

// Returns the estimated total ACH of a space (ACH from air cleaner(s) combined with the already existing outdoor
// ventilation)
function getACH(floorArea, ceilingHeight, units, cadr, outdoorVentilation) {
    let ach = getACHFromOneAirCleaner(floorArea, ceilingHeight, units, cadr);
    
    const minACHLevelToRecommend = 5;
    const maxNumAirCleaners = 5;
    if (ach + outdoorVentilation < minACHLevelToRecommend) {
        for (let i = 1; i < maxNumAirCleaners; i++) {
                ach += getACHFromOneAirCleaner(floorArea, ceilingHeight, units, cadr);
                if (ach + outdoorVentilation >= minACHLevelToRecommend) {
                    break;
                }
        }
    }

    return Math.round((ach + outdoorVentilation) * 100) / 100.0;
}

beforeEach(() => render(
    <CalculatorManager airCleaners={airCleanersForTesting} location={{state: {calculatorType: 'find'}}}/>));

it('shows basic parts of calculator page for finding an air cleaner successfully', () => {
    const unitInput = screen.getByLabelText('Units');
    expect(unitInput).toBeTruthy();
    expect(unitInput.value).toBe('feet'); // feet should be selected by default

    expect(screen.queryByText('Air Cleaner Model Name')).toBeNull();
    expect(screen.queryByText('CADR of Air Cleaner', {exact: false})).toBeNull();

    expect(screen.getByRole('group', {name: 'Ventilation'})).toBeTruthy();
    expect(screen.getByLabelText('Room Type')).toBeTruthy();
});

it('displays air cleaners with correct ach for a basic calculation', () => {
    const floorArea = 200;
    const ceilingHeight = 8;
    const outdoorVentilation = 1;

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});

    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});

    let poorVentilationRadioButton = screen.getByLabelText('Poor/Unsure');
    expect(poorVentilationRadioButton.checked).toBe(false);
    fireEvent.click(poorVentilationRadioButton);
    expect(poorVentilationRadioButton.checked).toBe(true);

    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    airCleanersForTesting.forEach((airCleaner) => {
        let ach = getACH(floorArea, ceilingHeight, 'feet', airCleaner.cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });
});

it('should allow users to go back to the calculator and edit their inputs when on the recommended air cleaners screen', () => {
    const initialRoomWidth = 20;
    const newRoomWidth = 15;
    const roomLength = 10;
    const ceilingHeight = 8;
    const outdoorVentilation = 3;

    let roomWidthInput = screen.getByLabelText('Room Width');
    let roomLengthInput = screen.getByLabelText('Room Length');
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    fireEvent.change(roomWidthInput, {target: {value: initialRoomWidth}});
    fireEvent.change(roomLengthInput, {target: {value: roomLength}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});

    let poorVentilationRadioButton = screen.getByLabelText('Poor/Unsure');
    fireEvent.click(poorVentilationRadioButton);
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));

    roomWidthInput = screen.getByLabelText('Room Width');
    roomLengthInput = screen.getByLabelText('Room Length');
    ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});

    expect(roomWidthInput.value).toBe(initialRoomWidth + '');
    expect(roomLengthInput.value).toBe(roomLength + '');
    expect(ceilingHeightInput.value).toBe(ceilingHeight + '');
    expect(poorVentilationRadioButton.checked).toBe(true);
    
    fireEvent.change(roomWidthInput, {target: {value: newRoomWidth}});
    let goodVentilationRadioButton = screen.getByLabelText('Good');
    fireEvent.click(goodVentilationRadioButton);
    poorVentilationRadioButton = screen.getByLabelText('Poor/Unsure');
    expect(poorVentilationRadioButton.checked).toBe(false);
    expect(goodVentilationRadioButton.checked).toBe(true);
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    airCleanersForTesting.forEach((airCleaner) => {
        let ach = getACH(newRoomWidth * roomLength, ceilingHeight, 'feet', airCleaner.cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });
});

it('gives users who only use the room width and length inputs the same result as users who only use the floor area input', () => {
    const roomWidth = 10;
    const roomLength = 20;
    const floorArea = 200;
    const ceilingHeight = 10;
    const outdoorVentilation = 1.5;

    let roomWidthInput = screen.getByLabelText('Room Width');
    let roomLengthInput = screen.getByLabelText('Room Length');
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    fireEvent.change(roomWidthInput, {target: {value: roomWidth}});
    fireEvent.change(roomLengthInput, {target: {value: roomLength}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});

    let typicalVentilationRadioButton = screen.getByLabelText('Typical');
    fireEvent.click(typicalVentilationRadioButton);

    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    airCleanersForTesting.forEach((airCleaner) => {
        let ach = getACH(floorArea, ceilingHeight, 'feet', airCleaner.cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });
    
    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    airCleanersForTesting.forEach((airCleaner) => {
        let ach = getACH(floorArea, ceilingHeight, 'feet', airCleaner.cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });
});

it('converts outdoor ventilation levels to the correct ACH', () => {
    const floorArea = 100;
    const ceilingHeight = 9;
    let outdoorVentilation = 1;

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});

    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});

    let poorVentilationRadioButton = screen.getByLabelText('Poor/Unsure');
    fireEvent.click(poorVentilationRadioButton);
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    airCleanersForTesting.forEach((airCleaner) => {
        let ach = getACH(floorArea, ceilingHeight, 'feet', airCleaner.cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });
    
    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));
    outdoorVentilation = 1.5
    let typicalVentilationRadioButton = screen.getByLabelText('Typical');
    fireEvent.click(typicalVentilationRadioButton);

    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    airCleanersForTesting.forEach((airCleaner) => {
        let ach = getACH(floorArea, ceilingHeight, 'feet', airCleaner.cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });
    
    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));
    outdoorVentilation = 3;
    let goodVentilationRadioButton = screen.getByLabelText('Good');
    fireEvent.click(goodVentilationRadioButton);
    
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    airCleanersForTesting.forEach((airCleaner) => {
        let ach = getACH(floorArea, ceilingHeight, 'feet', airCleaner.cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));
    outdoorVentilation = 4;
    let enhancedVentilationRadioButton = screen.getByLabelText('Enhanced');
    fireEvent.click(enhancedVentilationRadioButton);

    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    airCleanersForTesting.forEach((airCleaner) => {
        let ach = getACH(floorArea, ceilingHeight, 'feet', airCleaner.cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });
});

it('should work if the selected units are meters', () => {
    const floorArea = 100;
    const outdoorVentilation = 3;
    let ceilingHeight = 7;

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    let goodVentilationRadioButton = screen.getByLabelText('Good');
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(goodVentilationRadioButton);

    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    airCleanersForTesting.forEach((airCleaner) => {
        let ach = getACH(floorArea, ceilingHeight, 'feet', airCleaner.cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });
    
    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));
    ceilingHeight = 2;
    let unitSelection = screen.getByLabelText('Units');
    ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    fireEvent.change(unitSelection, {target: {value: 'meters'}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});

    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    airCleanersForTesting.forEach((airCleaner) => {
        let ach = getACH(floorArea, ceilingHeight, 'meters', airCleaner.cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });
});

it('should recommend multiple air cleaners if the space cannot reach an ideal level of ACH with just one', () => {
    // a room volume that all of the air cleaners used for testing need to use at least 2 air cleaners in to reach an ideal level (5 ACH)
    // of ACH (if "poor" ventilation (1 ACH) is being used).
    const floorArea = 800;
    const ceilingHeight = 10;
    const outdoorVentilation = 1;

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    let poorVentilationRadioButton = screen.getByLabelText('Poor/Unsure');
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(poorVentilationRadioButton);
    
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));


    const smallestCADR = 68;
    let weakestAirCleanerACH = getACH(floorArea, ceilingHeight, 'feet', smallestCADR, outdoorVentilation);
    // when using up to 5 air cleaners (the default max), this air cleaner is too weak to provide an estimated 5 air
    // changes per hour at the "poor" outdoor ventilation level
    expect(screen.queryByText(weakestAirCleanerACH)).toBeFalsy();
    const largerCADRs = [150, 211, 328, 500];
    largerCADRs.forEach((cadr) => {
        let ach = getACH(floorArea, ceilingHeight, 'feet', cadr, outdoorVentilation);
        expect(screen.getByText(ach)).toBeTruthy();
    });
});

it('should show occupancy disclaimer if user\'s space is too densely populated (with phase selection)', () => {
    const floorArea = 200;
    const ceilingHeight = 8;
    // retail store max occupancy is 25% at phases 1 and 2 and 50% at phase 3 at the time of writing this test
    const roomType = 'retail';
    const averageOccupancy = 30;
    const maxOccupancy = 70;
    let currentPhase = '1';

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});

    let poorVentilationRadioButton = screen.getByLabelText('Poor/Unsure');
    fireEvent.click(poorVentilationRadioButton);

    let roomTypeInput = screen.getByLabelText('Room Type');
    let averageOccupancyInput = screen.getByLabelText('Average Number of People in Room');
    let maxOccupancyInput = screen.getByLabelText('Maximum Occupancy');
    let currentPhaseInput = screen.getByLabelText('Current Phase');
    fireEvent.change(roomTypeInput, {target: {value: roomType}});
    fireEvent.change(averageOccupancyInput, {target: {value: averageOccupancy}});
    fireEvent.change(maxOccupancyInput, {target: {value: maxOccupancy}});
    fireEvent.change(currentPhaseInput, {target: {value: currentPhase}});

    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    expect(screen.getByText('Your space\'s average occupancy is greater than the recommended occupancy', {exact: false})).toBeTruthy();
    // make sure the phase that the user entered is displayed in the disclaimer
    expect(screen.getByText('Phase ' + currentPhase, {exact: false})).toBeTruthy();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));
    currentPhase = '2';
    currentPhaseInput = screen.getByLabelText('Current Phase');
    fireEvent.change(currentPhaseInput, {target: {value: currentPhase}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    expect(screen.getByText('Your space\'s average occupancy is greater than the recommended occupancy', {exact: false})).toBeTruthy();
    expect(screen.getByText('Phase ' + currentPhase, {exact: false})).toBeTruthy();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));
    currentPhase = '3';
    currentPhaseInput = screen.getByLabelText('Current Phase');
    fireEvent.change(currentPhaseInput, {target: {value: currentPhase}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    expect(screen.queryByText('Your space\'s average occupancy is greater than the recommended occupancy', {exact: false})).toBeNull();
    expect(screen.queryByText('Phase ' + currentPhase, {exact: false})).toBeNull();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));
    currentPhase = '4';
    currentPhaseInput = screen.getByLabelText('Current Phase');
    fireEvent.change(currentPhaseInput, {target: {value: currentPhase}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    expect(screen.queryByText('Your space\'s average occupancy is greater than the recommended occupancy', {exact: false})).toBeNull();
    expect(screen.queryByText('Phase ' + currentPhase, {exact: false})).toBeNull();
});

it('should show occupancy disclaimer if user\'s space is too densely populated (with max percent occupancy selection)', () => {
    const floorArea = 200;
    const ceilingHeight = 8;
    // retail store max occupancy is 25% at phases 1 and 2 and 50% at phase 3 at the time of writing this test
    const roomType = 'Retail';
    const averageOccupancy = 30;
    const maxOccupancy = 70;
    let currentMaxPercentOccupancy = '25';

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});

    let poorVentilationRadioButton = screen.getByLabelText('Poor/Unsure');
    fireEvent.click(poorVentilationRadioButton);

    let roomTypeInput = screen.getByLabelText('Room Type');
    let averageOccupancyInput = screen.getByLabelText('Average Number of People in Room');
    let maxOccupancyInput = screen.getByLabelText('Maximum Occupancy');
    let currentPhaseInput = screen.getByLabelText('Current Occupancy Limit Guideline');
    fireEvent.change(roomTypeInput, {target: {value: roomType}});
    fireEvent.change(averageOccupancyInput, {target: {value: averageOccupancy}});
    fireEvent.change(maxOccupancyInput, {target: {value: maxOccupancy}});
    fireEvent.change(currentPhaseInput, {target: {value: currentMaxPercentOccupancy}});

    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    expect(screen.getByText('Your space\'s average occupancy is greater than the recommended occupancy', {exact: false})).toBeTruthy();
    // make sure the maximum occupancy percentage that the user entered is displayed in the disclaimer
    expect(screen.getByText(currentMaxPercentOccupancy + '%', {exact: false})).toBeTruthy();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));
    currentMaxPercentOccupancy = '50';
    currentPhaseInput = screen.getByLabelText('Current Occupancy Limit Guideline');
    fireEvent.change(currentPhaseInput, {target: {value: currentMaxPercentOccupancy}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    expect(screen.queryByText('Your space\'s average occupancy is greater than the recommended occupancy', {exact: false})).toBeNull();
    expect(screen.queryByText(currentMaxPercentOccupancy + '%', {exact: false})).toBeNull();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));
    currentMaxPercentOccupancy = '75';
    currentPhaseInput = screen.getByLabelText('Current Occupancy Limit Guideline');
    fireEvent.change(currentPhaseInput, {target: {value: currentMaxPercentOccupancy}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    expect(screen.queryByText('Your space\'s average occupancy is greater than the recommended occupancy', {exact: false})).toBeNull();
    expect(screen.queryByText(currentMaxPercentOccupancy + '%', {exact: false})).toBeNull();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));
    currentMaxPercentOccupancy = '100';
    currentPhaseInput = screen.getByLabelText('Current Occupancy Limit Guideline');
    fireEvent.change(currentPhaseInput, {target: {value: currentMaxPercentOccupancy}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    expect(screen.queryByText('Your space\'s average occupancy is greater than the recommended occupancy', {exact: false})).toBeNull();
    expect(screen.queryByText(currentMaxPercentOccupancy + '%', {exact: false})).toBeNull();
});

it('should not show occupancy disclaimer if user\'s space is not too densely populated', () => {
    const floorArea = 300;
    const ceilingHeight = 10;
    // retail store max occupancy is 25% at phases 1 and 2 and 50% at phase 3 at the time of writing this test
    const roomType = 'Retail';
    const averageOccupancy = 15;
    const maxOccupancy = 70;
    let currentPhase = '1';

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});

    let poorVentilationRadioButton = screen.getByLabelText('Poor/Unsure');
    fireEvent.click(poorVentilationRadioButton);

    let roomTypeInput = screen.getByLabelText('Room Type');
    let averageOccupancyInput = screen.getByLabelText('Average Number of People in Room');
    let maxOccupancyInput = screen.getByLabelText('Maximum Occupancy');
    let currentPhaseInput = screen.getByLabelText('Current Phase');
    fireEvent.change(roomTypeInput, {target: {value: roomType}});
    fireEvent.change(averageOccupancyInput, {target: {value: averageOccupancy}});
    fireEvent.change(maxOccupancyInput, {target: {value: maxOccupancy}});
    fireEvent.change(currentPhaseInput, {target: {value: currentPhase}});

    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    expect(screen.queryByText('Your space\'s average occupancy is greater than the recommended occupancy', {exact: false})).toBeNull();
    expect(screen.queryByText('Phase ' + currentPhase, {exact: false})).toBeNull();
});