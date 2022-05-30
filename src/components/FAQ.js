import './FAQ.css';

export function FAQ() {
    return (
        <div id='faq-container'>
            <h1 id="faq-title">Frequently Asked Questions</h1>
            <div className="question-container">
                <span className="question-title">Are portable air cleaners all I need to prevent the spread of COVID-19?</span>
                <p className="question-answer"><strong>NO.</strong> Portable air cleaners are a small part of preventing COVID-19. Other methods like wearing masks, social distancing, increasing the amount of outdoor air being ventilated in your space, and upgrading your ventilation system's filters are all more important COVID-19 prevention methods than using portable air cleaners. <a href="https://schools.forhealth.org/wp-content/uploads/sites/19/2020/08/Harvard-Healthy-Buildings-Program-Portable-Air-Cleaners.pdf" target="_blank" rel="noreferrer">Here is a link</a> with information about
                portable air cleaners and when they should be used. <a href="https://schools.forhealth.org/risk-reduction-strategies-for-reopening-schools/healthy-buildings/" target="_blank" rel="noreferrer">This link</a> has more information about other COVID-19 prevention methods.
                </p>
            </div>
            <div className="question-container">
                <span className="question-title">Where should I place my air cleaner?</span>
                <p className="question-answer"> Generally, an air cleaner should be elevated about 3 to 5 feet off the ground and not in the corners of a room. Try to put it in the middle of your room if possible. If you have multiple air cleaners, space them out. Avoid having air from air cleaners blow on people. Research your air cleaner model to see if there are recommendations more specific to your model.
                </p>
            </div>
            <div className="question-container">
                <span className="question-title">What is ACH?</span>
                <p className="question-answer">ACH stands for Air Changes per Hour. If ACH is 5, then inside air will be exchanged with clean air approximately 5 times per hour. You should try to have at least 5 ACH in your space, but the higher the better. 
                </p>
            </div>
            <div className="question-container">
                <span className="question-title">What is CADR?</span>
                <p className="question-answer">CADR stands for Clean Air Delivery Rate. It indicates the volume of filtered air an air cleaner delivers (basically, how powerful/effective an air cleaner is).</p>
            </div>
            <div className="question-container">
                <span className="question-title">What calculations are being used in this tool?</span>
                <p className="question-answer">The primary calculation that is used is:</p>
                <p className="question-answer">ACH of a space (for units of feet) = (((Air Cleaner's CADR) * 60 / Room Volume (cubic feet)) * Number Of Air Cleaners Being Used) + Outdoor Air Ventilation. In this calculation, "Outdoor Air Ventilation" refers to the ACH in the space before air cleaners are added.</p>
                <p className="question-answer">ACH of a space (for units of meters) = (((Air Cleaner's CADR) / 0.58 / Room Volume (cubic meters)) * Number Of Air Cleaners Being Used) + Outdoor Air Ventilation. In this calculation, "Outdoor Air Ventilation" refers to the ACH in the space before air cleaners are added.</p>
                <p className="question-answer">The outdoor air ventilation levels that users select on this tool are mapped like this: "Poor" outdoor 
                air ventilation corresponds to 1 ACH. "Typical" outdoor air ventilation corresponds to 1.5 ACH. "Good" outdoor air
                ventilation corresponds to 3 ACH. "Enhanced" outdoor air ventilation corresponds to 4 ACH.</p>
                <p className="question-answer">There is also a calculation for recommended room size for an air cleaner which is:</p>
                <p className="question-answer">Recommended room size of an air cleaner (square feet) = (Air Cleaner's CADR + (Outdoor Ventilation * Room Volume (cubic feet) / 60)) * 60 / (5 * ceiling height (feet)).</p>
                <p className="question-answer">Recommended room size of an air cleaner (square meters) = ((Air Cleaner's CADR + (Outdoor Ventilation * Room Volume (cubic meters) * 35.3147 / 60)) * 60 / 35.315) / (5 * ceiling height (meters)).</p>
                <p className="question-answer">We also let users know if their room is overpopulated based on <a href="https://www.governor.wa.gov/issues/issues/covid-19-resources/covid-19-reopening-guidance" target="_blank" rel="noreferrer">Washington state governor's current COVID-19 occupancy guidelines</a>.</p>
            </div>
            <div className="question-container">
                <span className="question-title">Where do these calculations come from?</span>
                <p className="question-answer">Our tool is based on an <a href="https://docs.google.com/spreadsheets/d/1NEhk1IEdbEi_b3wa6gI_zNs8uBJjlSS-86d4b7bW098/edit#gid=1882881703" target="_blank" rel="noreferrer">existing spreadsheet tool</a> developed by researchers at Harvard University and the University of Colorado Boulder. Our tool uses the same calculations as this existing tool to calculate ACH (air changes per hour). We also let users know if their space is overpopulated by comparing their current occupancy level with <a href="https://www.governor.wa.gov/issues/issues/covid-19-resources/covid-19-reopening-guidance" target="_blank" rel="noreferrer">Washington state governor's current COVID-19 occupancy guidelines</a>.</p>
            </div>
            <div className="question-container">
                <span className="question-title">How were the air cleaners being recommended chosen?</span>
                <p className="question-answer">We sourced our list of recommended air cleaners from the spreadsheet tool we redesigned (linked in the above question) and from the ConsumerLab.com article <a href="https://www.consumerlab.com/answers/portable-air-cleaner/air-purifier/" target="_blank" rel="noreferrer">Which air purifiers are best for reducing the spread of COVID-19?</a>. Only air cleaners with HEPA filters are being recommended.</p>
            </div>
            <div className="question-container">
                <span className="question-title">Where do I find my device's CADR rating?</span>
                <p className="question-answer">You can find your portable air cleaner's CADR rating on the product's website or the specification
                    section that comes with your portable air cleaner.</p>
            </div>
            <div className="question-container">
                <span className="question-title">My air cleaner has CADR ratings for dust, smoke, and pollen. Which one should I use?</span>
                <p className="question-answer">Use the smoke CADR rating.</p>
            </div>
            <div className="question-container">
                <span className="question-title">Why are multiple portable air cleaners being recommended to me instead of just one?</span>
                <p className="question-answer">Your space may not be able to achieve an estimated ACH of 5 (the recommended minimum) with only one air cleaner. Also, using multiple smaller portable air cleaners is more effective than one large portable air cleaner, to address the nonuniformity of air and contaminant distribution across a room (source: <a href="https://schools.forhealth.org/wp-content/uploads/sites/19/2020/08/Harvard-Healthy-Buildings-Program-Portable-Air-Cleaners.pdf" target="_blank" rel="noreferrer">this link</a>) Buying multiple air cleaners instead of one may also be cheaper.
                </p>
            </div>
        </div>
    );
}