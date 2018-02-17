import React, { Component } from 'react';
import * as ReactGA from "react-ga";

import Aux from '../../hoc/Auxiliary/Auxiliary';

class Dashboard extends Component {
    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return(
            <Aux>

            </Aux>
        );
    }
}

export default Dashboard;