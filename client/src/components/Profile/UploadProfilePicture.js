import React, {Component} from 'react';
import axios from 'axios';
import {Image, Button} from "react-bootstrap";
import {connect} from "react-redux";

class UploadProfilePicture extends Component {
    state = {
        file: null
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        this.profilePictureUpload(this.state.file);
    };

    profilePictureUpload = (file) => {
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post('/api/uploadProfileImage', formData, config).then(res => {
            axios.get('/api/updateSessionUser').then(res => {
                window.location = '/profile';
            });
        });

    };

    onFileUploadChange = (e) => {
        this.setState({file:e.target.files[0]});
    };

    renderContent = () => {
        switch(this.props.auth) {
            case null:
                return;
            default:
                return(
                    <div className="main-center" style={{paddingTop:'0%', paddingBottom:'0%'}}>
                        <center>
                        <form onSubmit={this.onFormSubmit} className="form-horizontal" method="post" action="/api/uploadProfileImage" encType="multipart/form-data">
                            <center><Image src={this.props.auth.profilepicture} style={{width: '180px', paddingTop:'0%', paddingBottom:'0%'}} alt={this.props.auth.username} />
                            </center><br/>
                            <div className="form-group">
                                <label>Upload a profile picture:</label>

                                <input id="profile_picture" type="file" name="upload" multiple="multiple" onChange={this.onFileUploadChange} />

                            {/*<button type="submit" className="btn btn-primary btn-lg btn-block login-button">Submit</button>*/}
                            <br />
                                <div className="main-center" style={{paddingTop:'0%', paddingBotoom:'0%'}}>
                            <div style={{ maxWidth: 200, maxHeight: 30}}>
                                <Button type="submit" bsStyle="primary" bsSize="small" block>
                                    Update Profile Picture
                                </Button>
                            </div>
                            </div>
                            </div>
                        </form>
                        </center>
                    </div>
                );
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

export default connect(mapStateToProps)(UploadProfilePicture);