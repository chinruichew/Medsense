import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchVettedCases} from '../../actions';
import {Table} from 'react-bootstrap';

class VettedCases extends Component {
    componentDidMount() {
        this.props.fetchVettedCases();
    }

    renderVettedCases() {
        return this.props.vettedCases.reverse().map((vettedCase, index) => {
            return(
                <tr key={vettedCase._id}>
                    <td>{vettedCase.title}</td>
                    <td>{vettedCase.subspeciality}</td>
                    <td>{vettedCase.author}</td>
                    <td>{vettedCase.timestamp}</td>
                </tr>
            );
        });
    }

    renderContent() {
        switch(this.props.vettedCases) {
            case null:
                return;
            default:
                return(
                    <tbody>
                        {this.renderVettedCases()}
                    </tbody>
                );
        }
    }

    render() {
        return(
            <Table responsive>
                <thead>
                    <tr style={{background: '#82C5D9'}}>
                        <th>Case Title</th>
                        <th>Sub-speciality</th>
                        <th>Uploaded by</th>
                        <th>Date Uploaded</th>
                        <th></th>
                    </tr>
                </thead>
                {this.renderContent()}
            </Table>
        );
    }
}

function mapStateToProps2({vettedCases}) {
    return {
        vettedCases
    };
}

export default connect(mapStateToProps2, {fetchVettedCases})(VettedCases);