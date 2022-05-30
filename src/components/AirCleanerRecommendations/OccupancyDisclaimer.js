export function OccupancyDisclaimer(props) {

    // Returns either what phase the user is in or the maximum percent occupancy for their space depending on their
    // input in Step 3 of the calculator form.
    function getDynamicOccupancyDisclaimerInfo() {
        if (props.roomInfo.currPhase !== '') {
            return "Phase " + props.roomInfo.currPhase + " ";
        }
        return props.roomInfo.currPercentOccupancyGuideline + "% occupancy ";
    }

    return (
        <div id='occupancy-disclaimer'>
            <button id='close-occupancy-disclaimer-button' onClick={() => props.setOccupancyDisclaimerClosed(true)}>X</button>
            <p><span>Note: </span>Your space's average occupancy is greater than
            the recommended occupancy based on <span>{getDynamicOccupancyDisclaimerInfo()}</span> 
            guidelines for your space. The recommended air cleaners below are being
            recommended with the assumption that your room's occupancy meets current occupancy
            guidelines. For more information about occupancy guidelines for your type of space,
            click <a href='https://www.governor.wa.gov/issues/issues/covid-19-resources/covid-19-reopening-guidance' target="_blank" rel="noreferrer">here</a>.
            </p>
        </div>
    );
}