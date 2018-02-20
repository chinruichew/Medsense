import React, {Component} from 'react';
import {Table} from "react-bootstrap";

class IndividualCaseStatistics extends Component {
    renderContent = () => {
        // const table = this.props.
    };

    render() {
        return(
            <div>
                <h2>Case Statistics</h2>
                <Table responsive>
                    <thead>
                        <tr style={{background: '#82C5D9', fontSize:'130%'}}>
                            <td>S/N</td>
                            <td>Case Title</td>
                            <td>Total score</td>
                            <td>Date Completed</td>
                            <td>Time Taken</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderContent()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default IndividualCaseStatistics;