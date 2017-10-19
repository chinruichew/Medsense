import React, { Component } from 'react';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            username: this.props.username,
            school: this.props.school,
            year: this.props.year,
            profilepicture: this.props.profilepicture
        };

        this.handleSchoolChange = this.handleSchoolChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleProfilePictureChange = this.handleProfilePictureChange.bind(this);
    }

    handleSchoolChange(e) {
        this.setState({ school: e.target.value });
    }

    handleYearChange(e) {
        this.setState({ year: e.target.value });
    }

    handleProfilePictureChange(e) {
        this.setState({ profilepicture: e.target.value });
    }

    saveChanges(e) {
        //actions
    }

    render() {
        return (
            <div>

                <div> Username {this.state.username} </div>
                <br />
                
                <select value={this.state.school}
                    onChange={this.handleSchoolChange}>
                    <option value="Duke-NUS">Duke-NUS</option>
                    <option value="NTU">NTU</option>
                    <option value="NUS">NUS</option>
                </select>
                <br />

                <select value={this.state.year}
                    onChange={this.handleYearChange}>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                    <option value="5">Year 5</option>
                </select>
                <br />

                {/*upload*/}

                <button type="button"
                    onClick={(e) => this.saveChanges(e)}>
                    Save Changes
                    </button>

            </div>
        )
    }
}

export default UserProfile;