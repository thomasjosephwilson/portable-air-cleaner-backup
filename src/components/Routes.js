import React from 'react';
import {Home} from './Home.js';
import {About} from './About.js';
import {Resources} from './Resources.js';
import {FAQ} from './FAQ.js';
import {Switch, Route} from 'react-router-dom';
import { CalculatorManager } from './Calculator/CalculatorManager.js';

export function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/calculator' component={CalculatorManager} />
                <Route path='/about' component={About} />
                <Route path='/resources' component={Resources} />
                <Route path='/faq' component={FAQ} />
            </Switch>
        </div>
    )
}