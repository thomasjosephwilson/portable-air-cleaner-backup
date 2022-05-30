import { useTranslation } from "react-i18next";
import "./LandingPage.css";
import AirCleanerImg from "../../images/aircleaner_animated.png";
import { Link } from "react-router-dom";
import ReactToolTip from "react-tooltip";

export function LandingPage() {
    const {t} = useTranslation();

    return (
        <div >
            <div id="body-container">
                <div id="text-container">
                    <h1 id="title">{t('Title')}</h1>
                    <p id="text-calculator-description">Click a button below to either find a portable air cleaner that helps 
                    to keep your employees and customers safe or test your own portable air cleaner to find out whether 
                    it’s effectively ventilating your business.</p>
                    <div id="buttons-container">
                    <ReactToolTip id="find-btn-tooltip" place="bottom" effect="solid" backgroundColor="#00a2c7" fontColor="white" multiline={true}>Select this to find an air cleaner</ReactToolTip>
                    <Link to={{pathname: '/calculator', state: { calculatorType: "find", airCleaners : undefined}}}>
                        <button data-tip data-for="find-btn-tooltip" className="subheader--btn" id="subheader--btn-find">{t("FIND AIR CLEANER")}</button>   
                    </Link>
                    <ReactToolTip id="test-btn-tooltip" place="bottom" effect="solid" backgroundColor="#00a2c7" textColor="white" multiline={true}>Select this to test the efficiency of your air cleaner</ReactToolTip>
                    <Link to={{pathname: '/calculator', state: { calculatorType: "test", airCleaners : undefined}}}>
                        <button data-tip data-for="test-btn-tooltip" className="subheader--btn" id="subheader--btn-test">{t("TEST AIR CLEANER")}</button>
                    </Link>
                    </div>
                </div>
                <img id="img-aircleaner"src={AirCleanerImg} alt="Portable air cleaner drawing"/>
            </div>
        </div>
    );
}