import React, { Component } from 'react';
import {Image} from "react-bootstrap";

class NotFound extends Component {
    render() {
        return(
            <div>
                <Image src="./404Template.jpg" style={{height: '100%', width: '100%', padding: '0px', margin: '0px'}} />
            </div>
        );
    }
}

export default NotFound;