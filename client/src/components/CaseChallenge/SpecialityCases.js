import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCaseBySpeciality} from '../../actions';
import {Table} from 'react-bootstrap';

class SpecialityCases extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         speciality:this.props.speciality,
    //         subspeciality:this.props.subspeciality,
    //     }
    // }

    componentDidMount() {
        // this.props.fetchCaseBySpeciality(this.state);
        this.props.fetchCaseBySpeciality();
    }

    renderSpecialityCases() {
        // const subspecialities = this.state.subspeciality;
        const subspecialities = ['Cardiology'];
        console.log(this.props.specialityCases);
        return this.props.specialityCases.map((specialityCase, index) => {
            console.log(specialityCase);

            let specialities = "";
            for (let i=0; i<subspecialities.length-1; i++){
                specialities+=subspecialities[i] + ", ";
            }
            specialities+=subspecialities[subspecialities.length-1];

            let approaches = "";
            for (let k=0; k<specialityCase.approach.length-1; k++){
                approaches+=specialityCase.approach[k] + ", ";
            }
            approaches+=specialityCase.approach[specialityCase.approach.length-1];

            let timeStamp = specialityCase.timestamp.split(" ");
            let date = timeStamp[2]+" "+timeStamp[1]+" "+timeStamp[3];
            let timeArr = timeStamp[4].split(":");
            let time = timeArr[0]+":"+timeArr[1];

            return(
                <tr align="center" key={specialityCase._id}>
                    <td>{specialityCase.title}</td>
                    <td>{approaches}</td>
                    <td>{specialityCase.speciality}</td>
                    <td>{specialities}</td>
                    <td>{specialityCase.difficulty}</td>
                    <td>{specialityCase.authorname}</td>
                    <td>{date}<br/>{time}</td>
                </tr>
            );

        });
    }

    renderContent() {
        switch(this.props.specialityCases) {
            case null:
                return;
            default:
                return(
                    <tbody>
                    {this.renderSpecialityCases()}
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
                    <th><center>Approaches</center></th>
                    <th><center>Speciality</center></th>
                    <th><center>Sub-speciality</center></th>
                    <th><center>Difficulty Level</center></th>
                    <th><center>Uploaded by</center></th>
                    <th><center>Last Updated</center></th>
                    <th></th>
                </tr>
                </thead>
                {this.renderContent()}
            </Table>
        );
    }
}

function mapStateToProps2({specialityCases}) {
    return {
        specialityCases
    };
}

export default connect(mapStateToProps2, {fetchCaseBySpeciality})(SpecialityCases);