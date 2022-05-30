import teamLogo from '../images/coral_logo.png';
import commerceLogo from '../images/commerce_about_logo.png';
import restartLogo from '../images/restart_logo.png';
import airCleaner from '../images/aircleaner_animated.png';
import featureEfficiency from '../images/about_efficiency.png';
import featureFinding from '../images/about_finding.png';
import presentationVideo from '../videos/final_presentation.mp4';
import './About.css';

export function About() {
    return (
        <div>
            <div id="header-wrapper">
                <div id="header-first-rectangle">
                    <h2 id="header-title">About</h2>
                </div>
                <div id="header-second-rectangle"></div>
            </div>
            <div className="about-submodule-container" id="about-product-container">
                <div className="about-text-container" id="product-text-container">
                    <h2 id="first-header">PACC helps small businesses thrive by protecting their employees and customers</h2>
                    <p>Air quality is absolutely paramount in keeping yourself and your employees safe, especially for small businesses that function mostly indoors. One way that air quality can be improved and the spread of COVID-19 can be prevented is to use portable air cleaners.
                        <br /><br />PACC (Portable Air Cleaner Calculator) is a web application based on an <a href="https://docs.google.com/spreadsheets/d/1NEhk1IEdbEi_b3wa6gI_zNs8uBJjlSS-86d4b7bW098/edit#gid=1882881703" target="_blank" rel="noreferrer">existing spreadsheet tool</a> that helps users find and test air cleaners that they can use to sustain their businesses. Through PACC, we wish to lessen the burden for small businesses who are purchasing air cleaners by providing them with an intuitive and clean website with a beautiful and simplistic design.</p>
                </div>
                <img src={airCleaner} alt="Portable Air Cleaner Animated" id="img-cleaner" />
            </div>
            <div id="about-features-container">
                <h2 id="about-features-title">Key Features</h2>
                <div className="features-module-container">
                    <img className="features-img" src={featureEfficiency} alt="Efficiency Results Dashboard" />
                    <div className="features-text-container">
                        <h3 className="features-subtitle">Efficiency Calculator</h3>
                        <p>The Efficiency Calculator enables users to find how effective an air cleaner(s) is at cleaning the air in a particular space. After entering information such as room dimensions and the specifications of the air cleaner being tested, they will be shown a dashboard that includes information about the efficacy of the air cleaner.</p>
                    </div>
                </div>
                <div className="features-module-container">
                    <div className="features-text-container">
                        <h3 className="features-subtitle">Air Cleaner Recommendations</h3>
                        <p>Our Air Cleaner Recommendation Calculator enables users to find air cleaners that will help them to properly ventilate their establishment. After entering information about the space they want to ventilate such as the dimensions of the space, users are shown a list of air cleaners to choose from. Users can sort and filter the air cleaners in the list based on parameters that they may be interested in. Only air cleaners with HEPA filters are recommended.</p>
                    </div>
                    <img className="features-img" src={featureFinding} alt="Finding Air Cleaner List" />
                </div>
            </div>
            <div id="about-features-anglerect"></div>
            <div id="about-demo-container">
                <h2>Presentation Video</h2>
                <video controls>
                    <source src={presentationVideo} type="video/mp4" />
                </video>
            </div>
            <div className="about-submodule-container">
                <div className="about-text-container" id="about-team-container">
                    <h2>About the Team</h2>
                    <p>We are Informatics students at the University of Washington. We wanted to work on ths project because COVID-19 personally impacted us 
                        and many small businesses we know so we were motivated to help create a product that aims at reducing the spread of the virus. </p>
                </div>
                <img src={teamLogo} alt="Team Logo" id="img-logo"/>
            </div>
            <div className="about-submodule-container">
                <div className="about-text-container" id="about-sponsor-container">
                    <h2>Our Sponsor</h2>
                    <p>Sarah Lee, Director of Advanced Manafacturing at the Washington State Department of Commerce, is our sponsor. We are working under the efforts of the Safe Start grant which funds projects helping small businesses to keep running afer facing economic hardships during the COVID-19 pandemic. </p>
                </div>
                <img src={commerceLogo} alt="Commerce Logo" id="img-commerce-logo"/>
            </div>
            <div className="about-submodule-container">
                <div className="about-text-container" id="about-sponsor-container">
                    <h2>Project Status and Handoff</h2>
                    <p>As of May 21, 2021, we are no longer working on this product and have handed it off to Restart Partners. If you have any questions about this product, you can contact Restart Partners at info@restart.us.</p>
                </div>
                {/* kinda hacky but makes it work with flexbox */}
                <img src={restartLogo} id="img-restart-logo" alt="Restart Logo"/>
            </div>
        </div>
    )
}