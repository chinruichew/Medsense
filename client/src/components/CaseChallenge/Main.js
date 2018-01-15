import React, { Component } from 'react';
//import { Button, Table, FormGroup, Col, ControlLabel, FormControl, Row } from 'react-bootstrap';
import { Form, Button, Tabs, Tab, FormGroup, FormControl, Table, ControlLabel, Col, Row } from 'react-bootstrap';
import { bindAll } from 'lodash';
import * as ReactGA from "react-ga";
import SearchBySpeciality from './SearchBySpeciality';
import TimeLimit from "./TimeLimit";
import {connect} from "react-redux";
import {fetchRandomCase} from "../../actions";
import ApproachCases from './ApproachCases';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            approachBtnBackground: false,
            specialityBtnBackground: false,
            showApproachTable: false,
            showApproachSearch: false,
            showSpecialityTable: false,
            showSpecialitySearch: false,
            showTimeLimit: false,
            approach: null,
            authid: this.props.authid,
            authname: this.props.authname
        };

        bindAll(this, 'chooseApproachSearch', 'chooseSpecialitySearch', 'getRandomCase', 'renderMainContent',
            'handleApproachChange','renderApproachSearch', 'filterByApproach');
    }

    componentDidMount() {
        this.props.fetchRandomCase();
    }


    getRandomCase(){
        //set showTimeLimit to true
        this.setState({showTimeLimit: true});

    }
    chooseApproachSearch () {
        if(!this.state.showApproachSearch){
            this.setState({showApproachSearch: !this.state.showApproachSearch});
            this.setState({showSpecialitySearch: false});
        }

        if(!this.state.approachBtnBackground){
            this.setState({approachBtnBackground: !this.state.approachBtnBackground})
            this.setState({specialityBtnBackground: false})
        }
    }

    chooseSpecialitySearch(){
        if(!this.state.showSpecialitySearch){
            this.setState({showSpecialitySearch: !this.state.showSpecialitySearch})
            this.setState({showApproachSearch: false})
        }
        
        if(!this.state.specialityBtnBackground){
            this.setState({specialityBtnBackground: !this.state.specialityBtnBackground})
            this.setState({approachBtnBackground: false})
        }
    }

    handleApproachChange(e) {
        const options = e.target.options;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ approach: value });
            //this.update(value, "approach");
        }
        // const value = e.target.value;
        // this.setState({ approach: value });
        // this.update(value, "approach");
    }

    renderApproachSearch(){
        return(
            <div>
            <FormGroup controlId="formControlsApproach">

                <ControlLabel style={{ fontSize: "150%" }}>Approach(es)<br />
                    <div style={{ fontSize: "70%", fontWeight:"200"}}>
                        Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                    </div>
                </ControlLabel>
                <Row>
                    <Col sm={10}>
                <FormControl componentClass="select" value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)} multiple>
                    <option value="Select All Relevant">Select All Relevant</option>
                    <option value="Abdominal Pain">Abdominal Pain</option>
                    <option value="Breathlessness">Breathlessness</option>
                    <option value="Chest Pain">Chest Pain</option>
                    <option value="Confusion">Confusion</option>
                    <option value="Cough">Cough</option>
                    <option value="Diarrhea">Diarrhea</option>
                    <option value="Dizziness">Dizziness</option>
                    <option value="Falls">Falls</option>
                    <option value="Fever">Fever</option>
                    <option value="Gastrointestinal bleed">Gastrointestinal bleed</option>
                    <option value="Headache">Headache</option>
                    <option value="Jaundice">Jaundice</option>
                    <option value="Limb pain">Limb pain</option>
                    <option value="Limb swelling ">Limb swelling</option>
                    <option value="Palpitations">Palpitations</option>
                    <option value="Seizure">Seizure</option>
                    <option value="Syncope">Syncope</option>
                    <option value="Vomiting">Vomiting</option>
                    <option value="Weakness">Weakness</option>
                </FormControl>
                </Col>
                <Col sm={2}>
                    <Button style={{ background: "#199ED8", border: 0 }} bsStyle="primary"
                            onClick={(e) => this.filterByApproach()}>
                        Search
                    </Button>
                </Col>
                </Row>
            </FormGroup>

                {this.state.showApproachTable && <ApproachCases approach={this.state.approach}/>}
            </div>
        );
    }

    filterByApproach(){
        this.setState({ showApproachTable: true });
    }

    renderMainContent(){
        console.log(this.state.showTimeLimit);
        if(!this.state.showTimeLimit){
            let approachBtnBgColor = this.state.approachBtnBackground ?  "#F2F2F2": "white";
            let specialityBtnBgColor = this.state.specialityBtnBackground ?  "#F2F2F2": "white";
            return(
                <div align="center" className='container'>
                    <h1>
                        Get in some practice
                    </h1>
                    <h4>
                        <em>
                            Try out beginner mode for more focuses on history and physical exam,
                            <br />
                            and advanced mode for management.
                        </em>
                    </h4>
                    <br />
                    <br />
                    <Col xsOffset={1} sm={10}>
                        <Table responsive>
                            <tr align="center">
                                <td style={{width:"12em"}}>
                                    <Button style={{background: "white", color: 'black', width: "9em", height: "9em"}}
                                             bsSize="large" onClick={(e)=> this.getRandomCase()}>
                                        <img src="./circle.png" width="10%" height="10%"/> <br />Random Case
                                    </Button>

                                </td>
                                <td style={{width:"12em"}}>
                                    <Button style={{background: approachBtnBgColor,
                                        color: 'black', width: "9em", height: "9em"}}
                                            onClick={(e)=> this.chooseApproachSearch ()} bsSize="large">
                                        Sort by Approach
                                    </Button>
                                </td>
                                <td style={{width:"12em"}}>
                                    <Button style={{background: specialityBtnBgColor,
                                        color: 'black', width: "9em", height: "9em"}}
                                            onClick={(e)=> this.chooseSpecialitySearch()} bsSize="large">
                                        Sort by Speciality
                                    </Button>
                                </td>
                            </tr>
                        </Table>
                    </Col>
                </div>
            );
        } else {
            switch(this.props.randomCase) {
                case null:
                    return;
                default:
                    console.log(this.props.randomCase);
                    return <TimeLimit case={this.props.randomCase}/>
            }
        }
    }

    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        console.log(this.state.showTimeLimit);

        return (
            <div className="container">

            {this.renderMainContent()}
            <br />
            <br />
            {this.state.showApproachSearch && this.renderApproachSearch()}
            {this.state.showSpecialitySearch && <SearchBySpeciality/>}
        </div>
        );


    }
}

function mapStateToProps({randomCase}) {
    return {
        randomCase
    };
}

export default connect(mapStateToProps, {fetchRandomCase})(Main);