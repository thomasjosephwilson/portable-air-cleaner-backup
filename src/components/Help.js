import './Help.css';

export function Help() {
    return (
        <div id='help-content-container'>
            <h2 className='help-subheading'>Demo Video</h2>
            <p>space for demo video</p>
            <h2>Disclaimer</h2>
            <p>Wearing masks, social distancing, increasing airflow from outdoors with open doors and windows, and upgrading the filter
                that you use in your ventilation system (if you have a ventilation system) <strong>are all more
                important precautions to take than buying a portable air cleaner.</strong> Portable air cleaners are
                only a small part of preventing COVID-19. You can read more about these precautions <a href='#'>here</a>.
            </p>
            <p>Using a portable air cleaner may decrease the likelihood of infection from COVID-19, but it does not
                prevent it. We are not guaranteeing that any portable air cleaner we recommend will prevent
                you or others in the space the air cleaner is located to not be infected with COVID-19. You can read
                more about portable air cleaners <a href='#'>here</a>.
            </p>
            <h2 className='help-subheading'>Frequently Asked Questions (FAQs)</h2>
            <strong><p>Where should I place my air cleaner?</p></strong>
            <p>Portable air cleaners should usually be elevated about 3 feet off the ground (SOURCE?). They should be
                placed in an area that will cover as much of the room as possible, which is usually the center of the
                room. However, avoid placing the air cleaner so that the air released from it blows on people. The
                model of your specific air cleaner may have more information.
            </p>
            <strong><p>How long does it take for a portable air cleaner to fully ventilate a room?</p></strong>
            <p>calculation for this?
            </p>
            <strong><p>Where do I find my device's CADR rating?</p></strong>
            <p>You can find your portable air cleaner's CADR rating on the product's website or the specification
                section that comes with your portable air cleaner.
            </p>
            <strong><p>My air cleaner has CADR ratings for dust, smoke/tobacco smoke, and pollen. Which one should I use?</p></strong>
            <p>Use the dust CADR rating.</p>
            <strong><p>How do I estimate my room's ventilation rating?</p></strong>
            <p>The room ventilation can be calculated by using a CO_2 monitor. You can use <a href="#">this</a>
            link to measure it. If you can't/don't want to do this, you can estimate based on any upgrades to
            your ventilation system and how much fresh air you think is being circulated in the room.</p>
            <h2>Terminologies</h2>
        </div>
    );
}