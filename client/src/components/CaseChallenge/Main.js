import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, Table, ControlLabel, Col, Row } from 'react-bootstrap';
import { bindAll } from 'lodash';
import * as ReactGA from "react-ga";
import SearchBySpeciality from './SearchBySpeciality';
import TimeLimit from "./TimeLimit";
import {connect} from "react-redux";
import {fetchRandomCase} from "../../actions";
import SearchByApproach from './SearchByApproach';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            approachBtnBackground: false,
            specialityBtnBackground: false,
            //showApproachTable: false,
            showApproachSearch: false,
            //showSpecialityTable: false,
            showSpecialitySearch: false,
            showTimeLimit: false,
            //approach: null,
            authid: this.props.authid,
            authname: this.props.authname
        };

        bindAll(this, 'chooseApproachSearch', 'chooseSpecialitySearch', 'getRandomCase', 'renderMainContent');
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
            {this.state.showApproachSearch && <SearchByApproach/>}
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