import React, {Component} from 'react';
import axios from 'axios';

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
            console.log(res);
            axios.get('/api/updateSessionUser').then(res => {
                window.location = '/profile';
            });
        });

    };

    onFileUploadChange = (e) => {
        this.setState({file:e.target.files[0]});
    };

    render() {
        return(
            <div className="main-login main-center">
                <img src="./medsense_logo.png" style={{height: '120px', width: '300px'}} />
                {/*Note*/}
                <form onSubmit={this.onFormSubmit} className="form-horizontal" method="post" action="/api/uploadProfileImage" encType="multipart/form-data">
                    <div className="form-group">
                        <label>Upload a profile picture:</label>
                        {/*Note this?*/}
                        <input id="profile_picture" type="file" name="upload" multiple="multiple" onChange={this.onFileUploadChange} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Submit</button>
                </form>
            </div>
        );
    }
}

export default UploadProfilePicture;