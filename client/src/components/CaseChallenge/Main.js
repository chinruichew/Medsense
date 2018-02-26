import React, { Component } from 'react';
import { Button, Table, Col } from 'react-bootstrap';
import * as ReactGA from "react-ga";
import SearchBySpeciality from './SearchBySpeciality';
import TimeLimit from "./TimeLimit";
import {connect} from "react-redux";
import {fetchRandomCase, setGameOverview} from "../../actions";
import SearchByApproach from './SearchByApproach';
import {Redirect} from "react-router-dom";

import './Game.css';

class Main extends Component {
    state = {
        approachBtnBackground: false,
        specialityBtnBackground: false,
        showApproachSearch: false,
        showSpecialitySearch: false,
        showTimeLimit: false,
        random: false,
    };

    componentDidMount() {
        this.props.fetchRandomCase();
    }


    getRandomCase = () => {
        //set showTimeLimit to true
        this.setState({showTimeLimit: true, random: true});

    };

    chooseApproachSearch = () => {
        if(!this.state.showApproachSearch){
            this.setState({showApproachSearch: !this.state.showApproachSearch});
            this.setState({showSpecialitySearch: false});
        }

        if(!this.state.approachBtnBackground){
            this.setState({approachBtnBackground: !this.state.approachBtnBackground});
            this.setState({specialityBtnBackground: false})
        }
    };

    chooseSpecialitySearch = () => {
        if(!this.state.showSpecialitySearch){
            this.setState({showSpecialitySearch: !this.state.showSpecialitySearch});
            this.setState({showApproachSearch: false})
        }
        
        if(!this.state.specialityBtnBackground){
            this.setState({specialityBtnBackground: !this.state.specialityBtnBackground});
            this.setState({approachBtnBackground: false})
        }
    };

    handleReturnCase = (game) => {
        this.setState({
            showTimeLimit: true,
            game: game,
        })
    };

    renderMainContent = () => {
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
                            <br/>Choose a case from a particular subspecialty,
                            <br/>or choose a case according to an approach you want to practice (e.g. chest pain)!
                            <br/><br/>Try out beginner mode for more focuses on history and physical exam,
                            <br/>and advanced mode for management.
                            <br/><br/>Better yet, if you're up for the challenge, why not try a completely random case? :)
                            {/*<br/><br/>Take a look at your strengths and weaknesses on the analytics page after!*/}
                        </em>
                    </h4>
                    <br />
                    <br />
                    <Col xsOffset={1} sm={10}>
                        <Table responsive>
                            <tr align="center">
                                <td style={{width:"12em"}}>
                                    <Button style={{background: "white", color: 'black', width: "10em", height: "9em"}}
                                             bsSize="large" onClick={(e)=> this.getRandomCase()}>
                                        <img style={{marginBottom: "5%"}} src="./random.png" alt="" width="60%"/> <br />Random Case
                                    </Button>

                                </td>
                                <td style={{width:"12em"}}>
                                    <Button style={{background: approachBtnBgColor, color: 'black', width: "10em", height: "9em"}}
                                            onClick={(e)=> this.chooseApproachSearch ()} bsSize="large">
                                        <img style={{marginBottom: "5%"}} src="./appSearch.png" alt="" width="60%"/> <br />Search by Approach
                                    </Button>
                                </td>
                                <td style={{width:"12em"}}>
                                    <Button style={{background: specialityBtnBgColor, color: 'black', width: "10em", height: "9em"}}
                                            onClick={(e)=> this.chooseSpecialitySearch()} bsSize="large">
                                        <img style={{marginBottom: "5%"}} src="./speSearch.png" alt="" width="60%"/> <br /> <div>Search by Speciality</div>
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
                    if (this.state.random){
                        return <TimeLimit setGameOverview={this.props.setGameOverview} case={this.props.randomCase}/>
                    } else {
                        return <TimeLimit setGameOverview={this.props.setGameOverview} case={this.state.game}/>
                    }

            }
        }
    };

    renderSearch = () => {
        if(!this.state.showTimeLimit){
            return(
              <div>
                  {this.state.showApproachSearch && <SearchByApproach handleReturnCase={this.handleReturnCase}/>}
                  {this.state.showSpecialitySearch && <SearchBySpeciality handleReturnCase={this.handleReturnCase}/>}
              </div>
            );
        }
    };

    renderContent = () => {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return(<Redirect to="/" />);
            default:
                return(
                    <div className="container">
                        {this.renderMainContent()}
                        <br /><br />
                        {this.renderSearch()}
                    </div>
                );
        }
    };

    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return (
            <div>
                {this.renderContent()}
            </div>
        );


    }
}

function mapStateToProps({randomCase, auth}) {
    return {
        randomCase,
        auth
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRandomCase: () => dispatch(fetchRandomCase()),
        setGameOverview: (values) => dispatch(setGameOverview(values))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);