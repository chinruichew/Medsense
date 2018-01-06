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
            switch(this.props.filterVetted) {
                case 'All':
                    let timeStamp = vettedCase.timestamp.split(" ");
                    let date = timeStamp[2]+" "+timeStamp[1]+" "+timeStamp[3];
                    let timeArr = timeStamp[4].split(":");
                    let time = timeArr[0]+":"+timeArr[1];
                    return(
                        <tr align="center" key={vettedCase._id}>
                            <td>{vettedCase.title}</td>
                            <td>{vettedCase.subspeciality}</td>
                            <td>{vettedCase.authorname}</td>
                            <td>{date}<br/>{time}</td>
                        </tr>
                    );
                default:
                    let toRenderCase = false;
                    for(let i = 0; i < vettedCase.subspeciality.length; i++) {
                        const vettedCaseSubspeciality = vettedCase.subspeciality[i];
                        if(vettedCaseSubspeciality === this.props.filterVetted) {
                            toRenderCase = true;
                        }
                    }
                    if(toRenderCase) {
                        let timeStamp = vettedCase.timestamp.split(" ");
                        let date = timeStamp[2]+" "+timeStamp[1]+" "+timeStamp[3];
                        let timeArr = timeStamp[4].split(":");
                        let time = timeArr[0]+":"+timeArr[1];
                        return(
                            <tr align="center" key={vettedCase._id}>
                                <td>{vettedCase.title}</td>
                                <td>{vettedCase.subspeciality}</td>
                                <td>{vettedCase.authorname}</td>
                                <td>{date}<br/>{time}</td>
                            </tr>
                        );
                    }
                    return;
            }
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
                <tr style={{background: '#D9EDF7', fontSize: "130%"}}>
                    <th><center>Case Title</center></th>
                    <th><center>Sub-speciality</center></th>
                    <th><center>Uploaded by</center></th>
                    <th><center>Upload Date</center></th>
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