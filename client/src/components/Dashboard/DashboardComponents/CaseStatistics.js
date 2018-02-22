import React, {Component} from 'react';
import {Table} from "react-bootstrap";

class CaseStatistics extends Component {
    render() {
        const cases = this.props.cases.map(statCase => {
            return(
                <tr align="center">
                    <td>{statCase.title}</td>
                    <td>{0}</td>
                    <td>{'NOOOOOOOOOOOOOOOOOO'}</td>
                </tr>
            );
        });
        return(
            <div className="col-md-12">
                <h2>Case Statistics</h2>
                <Table responsive>
                    <thead >
                        <tr style={{background: '#82C5D9', fontSize:'130%'}}>
                            <th><center>Case Title</center></th>
                            <th><center>Average Score</center></th>
                            <th><center>Average Time Spent</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CaseStatistics;