import { useTranslation } from 'react-i18next';
import './LanguageSelection.css';

export function LanguageSelection() {
    const {t, i18n} = useTranslation();

    return (
        <div id='language-selection'>
            <label id='language-selection-label' htmlFor='language-selection-dropdown'>{t('Language') + ':'}</label>
            <select id='language-selection-dropdown' onChange={(e) => i18n.changeLanguage(e.target.value)}>
                <option value='en'>English</option>
            </select>
        </div>
    )
}