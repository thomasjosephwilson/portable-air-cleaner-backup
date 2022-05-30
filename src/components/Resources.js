import './Resources.css';

export function Resources() {
    return (
        <div id='resources-container'>
            <h1 id="resources-title">Resources</h1>
            <div className="resources-submodule-container">
                <h2 className="resources-subtitle">Extended Disclaimer</h2>
                <div>
                <p><strong>This tool assumes that the people present in your space are wearing masks and have low
                    activity levels (not exercising, singing, shouting, or any other activity that causes heavy
                    breathing). If your space contains individuals who are not wearing masks or have high activity
                    levels (if your space is an eating/drinking area, gym, or area where people are singing/shouting, 
                    etc.) portable air cleaners may not be as effective at preventing the spread of COVID-19 compared
                    to other types of spaces.</strong></p>
                    <p>This tool also assumes that when you use an air cleaner(s), it will be running at full capacity.
                    Some models may have options to turn down the power level to decrease noise but this reduces the
                    effectiveness of the air cleaner(s).</p>
                    <p><strong>We don't recommend that you use our tool if your floor area is over 3000 square feet.</strong></p>
                    <p>Using a portable air cleaner will not necessarily prevent the spread of COVID-19.{' '}
                        <a href="https://schools.forhealth.org/wp-content/uploads/sites/19/2020/08/Harvard-Healthy-Buildings-Program-Portable-Air-Cleaners.pdf" target="_blank" rel="noreferrer">Here is a link</a>{' '}
                        with information about portable air cleaners and when they should be used.{' '}
                        <a href="https://schools.forhealth.org/risk-reduction-strategies-for-reopening-schools/healthy-buildings/" target="_blank" rel="noreferrer">This link</a>{' '}
                    has more information about other COVID-19 prevention methods. Adherence to any information included in this tool will
                    not ensure successful treatment in every situation, and the user should acknowledge that there is 
                    no “zero risk” scenario, that each building and situation are unique and some of the guidance 
                    contained in this application will not apply to all buildings, or countries outside the United 
                    States.</p>
                    <p>Furthermore, the tool should not be deemed inclusive of all proper methods nor exclusive of other 
                    methods reasonably directed to obtaining the same results. The tool is in no way intended to 
                    override or supersede guidance from government and health organizations, including, without 
                    limitation, the Centers for Disease Control and Prevention, the World Health Organization, the 
                    United States Government, and or any States. The information contained herein reflects the 
                    available information at the time the application was created. If you are using this tool, you 
                    recognize that details and information are changing daily, and new information and/or the results 
                    of future studies may require revisions to the application (and the general guidance contained 
                    therein) to reflect new data. We do not warrant the accuracy or completeness of the guidance in 
                    this application and assume no responsibility for any injury or damage to persons or property 
                    arising out of or related to any use of the report or for any errors or omissions.</p>
                </div>
            </div>
            <div className="resources-submodule-container">
                <h2 className="resources-subtitle">COVID-19 Prevention</h2>
                <ul>
                    <li><a href="https://schools.forhealth.org/risk-reduction-strategies-for-reopening-schools/healthy-buildings/" target="_blank" rel="noreferrer">COVID-19 Prevention Methods/Techniques</a></li>
                </ul>
                <h2 className="resources-subtitle">References {'&'} Tools</h2>
                <span className="references-title">Spreadsheet Tools:</span>
                <ul>
                    <li><a href="https://docs.google.com/spreadsheets/d/1NEhk1IEdbEi_b3wa6gI_zNs8uBJjlSS-86d4b7bW098/edit#gid=1882881703" target="_blank" rel="noreferrer">Harvard-CU Boulder Portable Air Cleaner Calculator for Schools</a> (our tool is based on this tool)</li>
                    <li><a href="https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277" target="_blank" rel="noreferrer">COVID-19 Aerosol Transmission Estimator</a></li>
                </ul>
                <span className="references-title">Research papers and other references relating to COVID-19 and/or air quality:</span>
                <ul>
                    <li><a href="https://docs.google.com/document/d/1fB5pysccOHvxphpTmCG_TGdytavMmc1cUumn8m0pwzo/edit" target="_blank" rel="noreferrer">FAQs on Protecting Yourself from COVID-19 Aerosol Transmission</a></li>
                    <li><a href="https://www.ahamdir.com/room-air-cleaners/" target="_blank" rel="noreferrer">Ahamdir Certified Room Air Cleaners</a></li>
                    <li><a href="https://theconversation.com/how-to-use-ventilation-and-air-filtration-to-prevent-the-spread-of-coronavirus-indoors-143732" target="_blank" rel="noreferrer">How to use ventilation and air filtration to prevent the spread of coronavirus indoors</a></li>
                    <li><a href="https://www.sciencedirect.com/science/article/pii/S0160412020312800" target="_blank" rel="noreferrer">Estimation of airborne viral emission: Quanta emission rate of SARS-CoV-2 for infection risk assessment</a></li>
                    <li><a href="https://www.sciencedirect.com/science/article/pii/S0160412020320675?via%3Dihub#t0010" target="_blank" rel="noreferrer">Quantitative assessment of the risk of airborne transmission of SARS-CoV-2 infection: Prospective and retrospective applications</a></li>
                    <li><a href="https://www.sciencedirect.com/science/article/pii/S0360132321000706" target="_blank" rel="noreferrer">Ventilation and air cleaning to limit aerosol particle concentrations in a gym during the COVID-19 pandemic</a></li>
                    <li><a href="http://coolvent.mit.edu/" target="_blank" rel="noreferrer">MIT Cool Vent</a></li>
                    <li><a href="https://www.epa.gov/indoor-air-quality-iaq/office-building-occupants-guide-indoor-air-quality" target="_blank" rel="noreferrer">An Office Building Occupants Guide to Indoor Air Quality</a></li>
                    <li><a href="https://www.epa.gov/sites/production/files/2014-08/documents/ventilation_factsheet.pdf" target="_blank" rel="noreferrer">Ventilation and Air Quality in Offices</a></li>
                </ul>
            </div>
        </div>
    )
}