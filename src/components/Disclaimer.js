import './Disclaimer.css';

export function Disclaimer(props) {
    return (
        <div id='disclaimer-container'>
            <div id='disclaimer'>
                <p id='disclaimer-title'><strong>Disclaimer</strong></p>
                <p className='disclaimer-body-text'>Portable air cleaners are only a <strong>small</strong> part of preventing the spread of COVID-19 indoors. Wearing masks, social distancing, upgrading ventilation system filters, and increasing the amount of outside air being circulated in an indoor space are <strong>all more effective techniques</strong> to prevent the spread of COVID-19 than using portable air cleaners. You can learn more about these techniques by selecting the "Resources" tab at the top of the page. Not all types of spaces will benefit from portable air cleaners. <strong>Please read the extended disclaimer in the "Resources" tab before using our tool</strong>. 
                </p>
                <button id='close-disclaimer-button' onClick={() => props.closeDisclaimer()}>I understand</button>
            </div>
        </div>
    );
}