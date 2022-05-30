import {useState} from 'react';
import { LandingPage } from './LandingPage/LandingPage';
import {Disclaimer} from './Disclaimer.js';

export function Home() {
    // this is only used to make the component rerender in the closeDisclaimer() function
    const [disclaimerClicked, setDisclaimerClicked] = useState(false);

    function closeDisclaimer() {
        sessionStorage.setItem('disclaimerClosed', 'true');
        setDisclaimerClicked(true);
    }

    return (
        (sessionStorage.getItem('disclaimerClosed') === null ? 
            <Disclaimer closeDisclaimer={closeDisclaimer}/> :
            <LandingPage />)
    );
}