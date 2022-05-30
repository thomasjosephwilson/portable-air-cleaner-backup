import {fireEvent, render, screen} from '@testing-library/react';
import {AirCleanerDetails} from '../AirCleanerRecommendations/AirCleanerDetails.js';

// The different test files are conflicting with each other and can't be run at the same time.
// Please see the TestAirCleaner.test.js file in this directory for instructions on how to run the test in this file.

/*
it('should calculate the correct ACH when the number of air cleaners being used is changed', () => {
    let airCleaner = {
        ach: 5.5,
        numAirCleaners: 5,
        achFromOneAirCleaner: 0.9,
        outdoorVentilation: 1,
        size: '15 x 20 x 10'
    };
    let newNumAirCleaners = 3;
    let newACH = 3.7;
    render(<AirCleanerDetails airCleaner={airCleaner}/>);

    expect(screen.getByText(airCleaner.ach)).toBeTruthy();
    let numAirCleanersInput = screen.getByTestId('change-num-air-cleaners-input');
    fireEvent.change(numAirCleanersInput, {target: {value: newNumAirCleaners}});
    expect(screen.getByText(newACH)).toBeTruthy();
});*/