import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import StudentSignUpForm from './StudentSignUpForm';

class StudentSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            confirmpassword: null,
            school: "Duke-NUS",
            year: "Year 1"
        };
    }

    componentDidMount() {
        // Dynamically set background image
        document.body.style.backgroundImage = "url('./home_background.jpg')";
        document.body.style.backgroundSize = "100% 100%";
    }

    handleSchoolChange(e) {
        this.setState({ school: e.target.value });
    }

    handleYearChange(e) {
        this.setState({ year: e.target.value });
    }

    render() {
        let imagepreview;
        if (this.state.profilepicture) {
            imagepreview = (
                <div>
                    <img className='image-preview' src={this.state.profilepicture} width="80" height="80" />
                </div>
            );
        }


        return (
            <div className="container-fluid">
                <div className="row">
                    <StudentSignUpForm />
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'studentSignUpForm'
})(StudentSignup);