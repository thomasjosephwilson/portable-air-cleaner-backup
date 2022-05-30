import { LanguageSelection } from './../LanguageSelection.js';
import './../LanguageSelection.css';

export function Footer() {
    return (
            <footer>
                <div id='language-selection-container'>
                    <LanguageSelection />
                </div>
            </footer>
    );    
}