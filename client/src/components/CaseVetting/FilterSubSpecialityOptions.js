import React, { Component } from 'react';
import {FormControl} from "react-bootstrap";
import axios from 'axios';

class FilterSubSpecialityOptions extends Component {
    state = {
        subSpecialityList: null
    };

    componentDidMount() {
        axios.get('/api/getSubSpeciality').then(res => {
            this.setState({subSpecialityList: res.data});
        });
    }

    renderContent = () => {
        switch(this.state.subSpecialityList) {
            case null:
                return;
            default:
                return this.state.subSpecialityList.map((subSpeciality, index) => {
                    return(
                        <option value={subSpeciality}>{subSpeciality}</option>
                    );
                });
        }
    };

    render() {
        return(
            <FormControl componentClass="select" value={this.props.value} name={this.props.name} onChange={this.props.change}>
                <option value="All">All</option>
                {this.renderContent()}
            </FormControl>
        );
    }
}

export default FilterSubSpecialityOptions;