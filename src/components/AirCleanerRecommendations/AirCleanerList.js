import './AirCleanerList.css';
import './AirCleanerRecommendations.css';
import { AirCleanerListItem } from './AirCleanerListItem';
import {useEffect, useState} from 'react';

export function AirCleanerList(props) {
    const [recommendedAirCleaners, setRecommendedAirCleaners] = useState([]);

    const airCleanerComponents = recommendedAirCleaners.map((item, index) => 
    <AirCleanerListItem key={item.name} id={index} airCleaner={item} detailsClick={props.detailsClick} />
    );
    const minACHLevelToRecommend = 5;

    useEffect(() => {
        function getOutdoorVentilation() {
            let outdoorVentilation = 1;
            if (props.roomInfo.outdoorVentilation === 'Typical') {
                outdoorVentilation = 1.5
            } else if (props.roomInfo.outdoorVentilation === 'Good') {
                outdoorVentilation = 3;
            } else if (props.roomInfo.outdoorVentilation === 'Enhanced') {
                outdoorVentilation = 4;
            }
            return outdoorVentilation;
        }

        function getAchFromAirCleaner(cadr) {
            if (props.roomInfo.units === 'feet') {
                return ((cadr * 60) / (props.roomInfo.floorArea * props.roomInfo.ceilingHeight));
            } else {
                return ((cadr / 0.58) / (props.roomInfo.floorArea * props.roomInfo.ceilingHeight));
            }
        }
        
        // Adds (as properties/attributes) the outdoor ventilation level of the room the air cleaner is in, how many
        // air cleaners of this type are needed to properly ventilate the room, and the price of the number of air
        // cleaners needed to the air cleaner passed as a parameter.
        function addAdditionalPropertiesToAirCleaner(airCleaner) {
            let achFromAirCleaners = getAchFromAirCleaner(airCleaner.cadr);
            let outdoorVentilation = getOutdoorVentilation();

            airCleaner.achFromOneAirCleaner = achFromAirCleaners;
            let numAirCleaners = 1;
            if (achFromAirCleaners + outdoorVentilation < minACHLevelToRecommend) {
                for (let i = 1; i < props.filterOptions.maxNumAirCleaners; i++) {
                        achFromAirCleaners += airCleaner.achFromOneAirCleaner;
                        numAirCleaners++;
                
                        if (achFromAirCleaners + outdoorVentilation >= minACHLevelToRecommend) {
                            break;
                        }
                }
            }

            airCleaner.ach = Math.round((achFromAirCleaners + outdoorVentilation) * 100) / 100.0 ;
            airCleaner.numAirCleaners = numAirCleaners;
            airCleaner.price = Math.round(airCleaner.priceOfOneAirCleaner * numAirCleaners * 100) / 100.0;
            airCleaner.outdoorVentilation = outdoorVentilation;
        }

        function filterAirCleaners(airCleaners) {
            return [...airCleaners].filter((airCleaner) => {
                if (airCleaner.ach < minACHLevelToRecommend) {
                    return false;
                }
                if ((props.filterOptions.maxPrice > -1) && (props.filterOptions.maxPrice < airCleaner.price)) {
                    return false;
                }
                if ((props.filterOptions.maxNoise > -1) && ((props.filterOptions.maxNoise < airCleaner.noise) || airCleaner.noise === -1)) {
                    return false;
                }
                if ((props.filterOptions.maxPower > -1) && ((props.filterOptions.maxPower < airCleaner.power) || airCleaner.power === -1)) {
                    return false;
                }

                return true;
            });
        }

        function sortAirCleaners(filteredUnsortedAirCleaners) {
            return filteredUnsortedAirCleaners.sort((a, b) => {
                if (a[props.sortKey] === -1 && b[props.sortKey] !== -1) {
                    return 1;
                }
                if (b[props.sortKey] === -1 && a[props.sortKey] !== -1) {
                    return -1;
                }
                
                if (props.sortKey === 'ach') {
                    return b[props.sortKey] - a[props.sortKey];
                }
                return a[props.sortKey] - b[props.sortKey];
            });
        }

        let airCleaners = props.airCleaners;
        airCleaners.forEach((airCleaner) => {
            addAdditionalPropertiesToAirCleaner(airCleaner)
        });

        let filteredUnsortedAirCleaners = filterAirCleaners(airCleaners);
        let sortedAirCleaners = sortAirCleaners(filteredUnsortedAirCleaners);
        
        setRecommendedAirCleaners(sortedAirCleaners);
    }, [props]);

    return (
        <div id='air-cleaner-list'>
            {airCleanerComponents.length > 0 ? airCleanerComponents :
                <div id='no-air-cleaners-found-message-container'>
                    <p>Sorry, but there were no portable air cleaners found. You may be using filtering options that 
                        are too specific.</p>
                </div>
            }
        </div>
    );
}