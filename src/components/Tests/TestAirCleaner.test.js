import {fireEvent, render, screen} from '@testing-library/react';
import {CalculatorManager} from '../Calculator/CalculatorManager.js';
import {airCleanersForTesting} from './FindAirCleaner.test.js';

// The different test files are conflicting with each other and can't be run at the same time.
// If you want to run other tests (any file ending in `.test.js`), uncomment the block below and comment all code
// (other than any code exporting constants) in the uncommented test file. Then run `npm test -- FileName.test.js` to
// run the tests that you want to run.

/*
// prevents irrelevant console error message when running tests
global.window.scrollTo = () => {};

function getACHFromOneAirCleaner(floorArea, ceilingHeight, units, cadr) {
    if (units === 'feet') {
        return (cadr * 60) / (floorArea * ceilingHeight);
    }
    return (cadr / 0.58) / (floorArea * ceilingHeight);
}

function getACH(floorArea, ceilingHeight, units, cadr, outdoorVentilation, numAirCleaners = 1) {
    let ach = getACHFromOneAirCleaner(floorArea, ceilingHeight, units, cadr);
    return Math.round(((ach * numAirCleaners) + outdoorVentilation) * 10) / 10;
}

function getMaxAirCleanerRoomSizeAtOutdoorVentilationLevel(floorArea, ceilingHeight, units, cadr, outdoorVentilation) {
    if (units === 'feet') {
        let totalCADR = cadr + ((outdoorVentilation * (floorArea * ceilingHeight)) / 60);
        return Math.floor((totalCADR * 60) / (5 * ceilingHeight));
    }
    let totalCADR = cadr + ((outdoorVentilation * (floorArea * ceilingHeight) * 35.3147) / 60);
    return Math.floor((totalCADR * 60 / 35.315) / (5 * ceilingHeight));
}

beforeEach(() => render(
    <CalculatorManager airCleaners={airCleanersForTesting} location={{state: {calculatorType: 'test'}}}/>));

it('shows basic parts of calculator page for finding an air cleaner successfully', () => {
    const unitInput = screen.getByLabelText('Units');
    expect(unitInput).toBeTruthy();
    expect(unitInput.value).toBe('feet'); // feet should be selected by default

    expect(screen.getByLabelText('Air Cleaner Model Name')).toBeTruthy();
    expect(screen.getByLabelText('CADR of Air Cleaner', {exact: false})).toBeTruthy();

    expect(screen.getByRole('group', {name: 'Ventilation'})).toBeTruthy();
    expect(screen.getByLabelText('Room Type')).toBeTruthy();
});

it('allows users to go back and edit their inputs', () => {
    let floorArea = 200;
    let ceilingHeight = 9;
    let cadr = 163;
    let outdoorVentilation = 3;

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    let outdoorVentilationRadioButton = screen.getByLabelText('Good');
    let cadrInput = screen.getByLabelText('CADR of Air Cleaner', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(outdoorVentilationRadioButton);
    fireEvent.change(cadrInput, {target: {value: cadr}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    let ach = getACH(floorArea, ceilingHeight, 'feet', cadr, outdoorVentilation);
    expect(screen.getByText(ach)).toBeTruthy();
    expect(screen.getByText('IDEAL')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));

    expect(cadrInput.value).toBe(cadr + '');
    floorArea = 410;
    ceilingHeight = 10;
    cadr = 250;
    outdoorVentilation = 1;
    floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    outdoorVentilationRadioButton = screen.getByLabelText('Poor/Unsure');
    cadrInput = screen.getByLabelText('CADR of Air Cleaner', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(outdoorVentilationRadioButton);
    fireEvent.change(cadrInput, {target: {value: cadr}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    ach = getACH(floorArea, ceilingHeight, 'feet', cadr, outdoorVentilation);
    expect(screen.getByText(ach)).toBeTruthy();
    expect(screen.getByText('OKAY')).toBeTruthy();
});

it('converts ACH to correct ventilation ranks', () => {
    let floorArea = 350;
    let ceilingHeight = 8;
    let cadr = 250;
    let outdoorVentilation = 4;

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    let outdoorVentilationRadioButton = screen.getByLabelText('Enhanced');
    let cadrInput = screen.getByLabelText('CADR of Air Cleaner', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(outdoorVentilationRadioButton);
    fireEvent.change(cadrInput, {target: {value: cadr}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    let ach = getACH(floorArea, ceilingHeight, 'feet', cadr, outdoorVentilation);
    expect(screen.getByText(ach)).toBeTruthy();
    expect(screen.getByText('IDEAL')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));

    floorArea = 620;
    ceilingHeight = 8;
    cadr = 130;
    outdoorVentilation = 3;
    floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    outdoorVentilationRadioButton = screen.getByLabelText('Good');
    cadrInput = screen.getByLabelText('CADR of Air Cleaner', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(outdoorVentilationRadioButton);
    fireEvent.change(cadrInput, {target: {value: cadr}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    
    ach = getACH(floorArea, ceilingHeight, 'feet', cadr, outdoorVentilation);
    expect(screen.getByText(ach)).toBeTruthy();
    expect(screen.getByText('OKAY')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));

    floorArea = 350;
    ceilingHeight = 10;
    cadr = 225;
    outdoorVentilation = 1.5;
    floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    outdoorVentilationRadioButton = screen.getByLabelText('Typical');
    cadrInput = screen.getByLabelText('CADR of Air Cleaner', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(outdoorVentilationRadioButton);
    fireEvent.change(cadrInput, {target: {value: cadr}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    
    ach = getACH(floorArea, ceilingHeight, 'feet', cadr, outdoorVentilation);
    expect(screen.getByText(ach)).toBeTruthy();
    expect(screen.getByText('GOOD')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));

    floorArea = 1000;
    ceilingHeight = 11;
    cadr = 121;
    floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    cadrInput = screen.getByLabelText('CADR of Air Cleaner', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.change(cadrInput, {target: {value: cadr}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    
    ach = getACH(floorArea, ceilingHeight, 'feet', cadr, outdoorVentilation);
    expect(screen.getByText(ach)).toBeTruthy();
    expect(screen.getByText('VERY LOW')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', {name: /Go Back/}));

    floorArea = 750;
    ceilingHeight = 9;
    cadr = 290;
    outdoorVentilation = 1;
    floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    outdoorVentilationRadioButton = screen.getByLabelText('Poor/Unsure');
    cadrInput = screen.getByLabelText('CADR of Air Cleaner', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(outdoorVentilationRadioButton);
    fireEvent.change(cadrInput, {target: {value: cadr}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));
    
    ach = getACH(floorArea, ceilingHeight, 'feet', cadr, outdoorVentilation);
    expect(screen.getByText(ach)).toBeTruthy();
    expect(screen.getByText('BARE MINIMUM')).toBeTruthy();
});

it('calculates the correct room size for a single air cleaner correctly (when units are feet)', () => {
    let floorArea = 310;
    let ceilingHeight = 7;
    let cadr = 165;
    let outdoorVentilation = 3;

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    let outdoorVentilationRadioButton = screen.getByLabelText('Good');
    let cadrInput = screen.getByLabelText('CADR of Air Cleaner', {exact: false});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(outdoorVentilationRadioButton);
    fireEvent.change(cadrInput, {target: {value: cadr}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    let recommendedMaxRoomSize = getMaxAirCleanerRoomSizeAtOutdoorVentilationLevel(floorArea, ceilingHeight, 'feet', cadr, outdoorVentilation);
    expect(screen.getByText(recommendedMaxRoomSize, {exact: false})).toBeTruthy();
});

it('calculates the correct room size for a single air cleaner correctly (when units are meters)', () => {
    let floorArea = 100;
    let ceilingHeight = 4;
    let cadr = 165;
    let outdoorVentilation = 3;

    let unitSelection = screen.getByLabelText('Units');
    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    let outdoorVentilationRadioButton = screen.getByLabelText('Good');
    let cadrInput = screen.getByLabelText('CADR of Air Cleaner', {exact: false});
    fireEvent.change(unitSelection, {target: {value: 'meters'}});
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(outdoorVentilationRadioButton);
    fireEvent.change(cadrInput, {target: {value: cadr}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    let recommendedMaxRoomSize = getMaxAirCleanerRoomSizeAtOutdoorVentilationLevel(floorArea, ceilingHeight, 'meters', cadr, outdoorVentilation);
    expect(screen.getByText(recommendedMaxRoomSize, {exact: false})).toBeTruthy();
});

it('calculates the correct result if multiple air cleaners are used', () => {
    let floorArea = 300;
    let ceilingHeight = 10;
    let cadr = 100;
    let outdoorVentilation = 1.5;
    let numAirCleaners = 3;

    let floorAreaInput = screen.getByLabelText('Floor Area', {exact: false});
    let ceilingHeightInput = screen.getByLabelText('Ceiling Height', {exact: false});
    let outdoorVentilationRadioButton = screen.getByLabelText('Typical');
    let cadrInput = screen.getByLabelText('CADR of Air Cleaner', {exact: false});
    let numAirCleanersInput = screen.getByLabelText('Number of these Air Cleaners');
    fireEvent.change(floorAreaInput, {target: {value: floorArea}});
    fireEvent.change(ceilingHeightInput, {target: {value: ceilingHeight}});
    fireEvent.click(outdoorVentilationRadioButton);
    fireEvent.change(cadrInput, {target: {value: cadr}});
    fireEvent.change(numAirCleanersInput, {target: {value: numAirCleaners}});
    fireEvent.click(screen.getByRole('button', {name: 'VIEW RESULTS'}));

    let ach = getACH(floorArea, ceilingHeight, 'feet', cadr, outdoorVentilation, numAirCleaners);
    expect(screen.getByText(ach)).toBeTruthy();
});*/