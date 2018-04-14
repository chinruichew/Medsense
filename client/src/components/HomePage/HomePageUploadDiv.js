import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import axios from 'axios';

class HomePageUploadDiv extends Component {
    state = {
        constants: null
    };

    componentDidMount() {
        axios.get('/api/getConstantTypes').then(res => {
            this.setState({
                constants: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    renderContent = () => {
        switch(this.props.auth) {
            case null:
                return;
            default:
                switch(this.state.constants) {
                    case null:
                        return;
                    default:
                        let imgUrl = './homepage.png';
                        const caseUploadDescription = this.props.auth.usertype === this.state.constants.USER_TYPE_PROFESSOR? 'Have an interesting case to share? Upload it to share with your peers!': 'Have an interesting case to share? Upload it to share with your students!';
                        return(
                            <div className="image-div" style={{backgroundImage: 'url(' + imgUrl + ')'}}>
                                <h1>Upload Case</h1>
                                <hr/>
                                <p>{caseUploadDescription}</p><br/>
                                <NavLink to='/upload'>
                                    <Button className="image-button">
                                        <h4>Upload</h4>
                                    </Button>
                                </NavLink>
                            </div>
                        );
                }
        }
    };

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(HomePageUploadDiv);