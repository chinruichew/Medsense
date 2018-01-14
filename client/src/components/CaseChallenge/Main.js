import React, { Component } from 'react';
import { Button, Table, Panel, Col } from 'react-bootstrap';
import { bindAll } from 'lodash';
import FindCase from './FindCase';
import * as ReactGA from "react-ga";
import SearchBySpeciality from './SearchBySpeciality';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            approachBtnBackground: false,
            specialityBtnBackground: false,
            showApproachTable: false,
            showSpecialityTable: false,
            showTimeLimit: false,
            authid: this.props.authid,
            authname: this.props.authname
        };
        //this.chooseFind = this.chooseFind.bind(this);
        bindAll(this, 'chooseApproachSearch', 'chooseSpecialitySearch');
    }

    getRandomCase(){
        //set showTimeLimit to true
    }

    chooseApproachSearch () {
        if(!this.state.showApproachTable){
            this.setState({showApproachTable: !this.state.showApproachTable})
            this.setState({showSpecialityTable: false})
        }

        if(!this.state.approachBtnBackground){
            this.setState({approachBtnBackground: !this.state.approachBtnBackground})
            this.setState({specialityBtnBackground: false})
        }
    }

    chooseSpecialitySearch(){
        if(!this.state.showSpecialityTable){
            this.setState({showSpecialityTable: !this.state.showSpecialityTable})
            this.setState({showApproachTable: false})
        }
        
        if(!this.state.specialityBtnBackground){
            this.setState({specialityBtnBackground: !this.state.specialityBtnBackground})
            this.setState({approachBtnBackground: false})
        }
    }

    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        let approachBtnBgColor = this.state.approachBtnBackground ?  "#F2F2F2": "white";
        let specialityBtnBgColor = this.state.specialityBtnBackground ?  "#F2F2F2": "white";

        return (
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
                                             bsSize="large">
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

            <br />
            <br />
            
            {this.state.showSpecialityTable && <SearchBySpeciality/>} 
        </div>
        );


    }
}

export default Main;