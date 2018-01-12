import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Accordion, Panel } from 'react-bootstrap';
import { bindAll } from 'lodash';
//import Question from './Question.js';
//import Overview from './Overview.js';
import BootstrapModal from '../UI/Modal/UploadBootstrapModal.js';
//import './Upload.css';
//import { uploadCase } from '../../actions/index';
import axios from 'axios';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authid: this.props.authid,
            authname: this.props.authname
        };
        
    }
}
export default Main;