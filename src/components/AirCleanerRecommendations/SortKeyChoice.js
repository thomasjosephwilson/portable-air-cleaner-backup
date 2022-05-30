import './SortKeyChoice.css';
import './AirCleanerRecommendations.css';

export function SortKeyChoice(props) {
    return (
        <div id='sort-key-choice-container'>
            <div id='sort-key-choice'>
                <label htmlFor='sort-key-choice-dropdown'>Sort By:</label>
                <select id='sort-key-choice-dropdown' onChange={(e) => props.updateSortKey(e.target.value)}>
                    <option value='price'>Price</option>
                    <option value='noise'>Noise</option>
                    <option value='ach'>ACH (Air Changes per Hour)</option>
                </select>
            </div>
        </div>
    )
}