import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Image} from 'react-bootstrap';

class UAT extends Component {
    render(){
        return(
            <div>
                <center><Image src="./UATposter.png"/></center>
            </div>
        );
    }
}

export default UAT;