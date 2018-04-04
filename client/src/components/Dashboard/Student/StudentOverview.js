import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
<<<<<<< HEAD
import {NavLink} from "react-router-dom";
import {Button, Breadcrumb} from "react-bootstrap";

class StudentOverview extends Component {
    state = {
        specialityList: null,
        specialityFilterName: null,
        subSpecialityFilterName: null,
        caseDataMapping: [],
        headerFilterDisplay: <Breadcrumb><Breadcrumb.Item><Button bsSize="large" bsStyle="link" onClick={this.setSpecialityView}>All</Button></Breadcrumb.Item></Breadcrumb>
=======

class StudentOverview extends Component {
    state = {
        specialityList: null
>>>>>>> parent of e8327a8... Modified Student Analytics for more concise charts
    };

    componentDidMount() {
        axios.post('/api/fetchSpeciality').then(res => {
            this.setState({
                specialityList: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    getLevelOption = () => {
        return [
            {
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        gapWidth: 5
                    }
                }
            },
            {
                itemStyle: {
                    normal: {
                        gapWidth: 1
                    }
                }
            },
            {
                colorSaturation: [0.35, 0.5],
                itemStyle: {
                    normal: {
                        gapWidth: 1,
                        borderColorSaturation: 0.6
                    }
                }
            }
        ];
    };

    renderTreeMapOverview = () => {
        switch(this.state.specialityList) {
            case null:
                return;
            default:
                const answers = this.props.answers;

                const dataMapping = [];
                for(let i = 0; i < answers.length; i++) {
                    const answer = answers[i];
                    const answerCase = answer.case;
                    const speciality = answerCase.speciality;
                    const subSpecialities = answerCase.subspeciality;

                    // Add speciality scores
                    let toAdd = true;
                    for(let i = 0; i < dataMapping.length; i++) {
                        const dataObject = dataMapping[i];
                        if(dataObject.name === speciality) {
                            dataObject.value += answer.score;
                            toAdd = false;
                            break;
                        }
                    }
                    if(toAdd){
                        dataMapping.push({
                            value: answer.score,
                            name: speciality,
                            path: speciality,
                            children: []
                        });
                    }

                    // Add sub-speciality scores
                    const specialityList = this.state.specialityList;
                    for(let j = 0; j < dataMapping.length; j++) {
                        const dataObject = dataMapping[j];
                        for(let k = 0; k < specialityList.length; k++) {
                            const fetchedSpeciality = specialityList[k];
                            if(fetchedSpeciality.speciality === dataObject.name) {
                                const fetchedSubspecialities = fetchedSpeciality.subspecialities;
                                for(let l = 0; l < fetchedSubspecialities.length; l++) {
                                    const fetchedSubspeciality = fetchedSubspecialities[l];
                                    for(let m = 0; m < subSpecialities.length; m++) {
                                        const subSpeciality = subSpecialities[m];
                                        if(subSpeciality === fetchedSubspeciality.subspeciality) {
                                            const firstLevelChildren = dataObject.children;
                                            toAdd = true;
                                            for(let n = 0; n < firstLevelChildren.length; n++) {
                                                const firstLevelChild = firstLevelChildren[n];
                                                if(firstLevelChild.name === subSpeciality) {
                                                    firstLevelChild.value += answer.score;
                                                    toAdd = false;
                                                    break;
                                                }
                                            }
                                            if(toAdd) {
                                                for(let n = 0; n < dataMapping.length; n++) {
                                                    const dataObject = dataMapping[n];
                                                    const firstLevelChildren = dataObject.children;
                                                    let hasDuplicate = false;
                                                    for(let o = 0; o < firstLevelChildren.length; o++) {
                                                        const firstLevelChild = firstLevelChildren[o];
                                                        if(firstLevelChild.name === subSpeciality) {
                                                            hasDuplicate = true;
                                                            break;
                                                        }
                                                    }
                                                    if(!hasDuplicate) {
                                                        firstLevelChildren.push({
                                                            value: answer.score,
                                                            name: fetchedSubspeciality.subspeciality,
                                                            path: fetchedSubspeciality.subspeciality,
                                                            children: []
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // Categorize games by their cases
                const caseMapping = [];
                for(let i = 0; i < answers.length; i++) {
                    const answer = answers[i];
                    const answerCase = answer.case;
                    let toAdd = true;
                    for(let j = 0; j < caseMapping.length; j++) {
                        const caseMap = caseMapping[j];
                        if(caseMap._id === answerCase._id) {
                            caseMap.totalScore += answer.score;
                            caseMap.numAttempts++;
                            caseMap.answers.push(answer);
                            toAdd = false;
                            break;
                        }
                    }
                    if(toAdd) {
                        caseMapping.push({
                            _id: answerCase._id,
                            totalScore: answer.score,
                            numAttempts: 1,
                            answers: [...answer]
                        });
                    }
                }

                // Add cases into the Tree Map
                for(let i = 0; i < answers.length; i++) {
                    const answer = answers[i];
                    const answerCase = answer.case;
                    const subSpecialities = answerCase.subspeciality;
                    for(let j = 0; j < dataMapping.length; j++) {
                        const dataObject = dataMapping[j];
                        const firstLevelChildren = dataObject.children;
                        for(let k = 0; k < firstLevelChildren.length; k++) {
                            const firstLevelChild = firstLevelChildren[k];
                            let toAdd = false;
                            for(let l = 0; l < subSpecialities.length; l++) {
                                const subspeciality = subSpecialities[l];
                                if(subspeciality === firstLevelChild.name) {
                                    toAdd = true;
                                    break;
                                }
                            }
                            if(toAdd) {
                                let hasDuplicate = false;
                                for(let l = 0; l < firstLevelChild.children.length; l++) {
                                    const secondLevelChild = firstLevelChild.children[l];
                                    if(secondLevelChild.id === answerCase._id) {
                                        hasDuplicate = true;
                                        break;
                                    }
                                }
                                if(!hasDuplicate) {
                                    const secondLevelChildren = firstLevelChild.children;
                                    for(let l = 0; l < caseMapping.length; l++) {
                                        const caseMap = caseMapping[l];
                                        if(caseMap._id === answerCase._id) {
                                            secondLevelChildren.push({
                                                id: caseMap._id,
                                                value: caseMap.totalScore,
                                                name: answerCase.title,
                                                path: answerCase.title,
                                                children: []
                                            });
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                const modes = ['All', 'Year 2', 'Year 3'];
                const option = {

                    title: {
                        text: 'Performance Overview',
                        left: 'center',
                        backgroundColor: 'rgb(243,243,243)',
                        borderRadius: [5, 5, 0, 0]
                    },

                    legend: {
                        data: modes,
                        selectedMode: 'single',
                        top: 55,
                        itemGap: 5,
                        backgroundColor: 'rgb(243,243,243)',
                        borderRadius: 5
                    },

                    series: [
                        {
                            name:'Speciality',
                            type:'treemap',
                            visibleMin: 300,
                            label: {
                                show: true,
                                formatter: '{b}'
                            },
                            upperLabel: {
                                normal: {
                                    show: true,
                                    height: 30
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: '#fff'
                                }
                            },
                            levels: this.getLevelOption(),
                            data: dataMapping
                        }
                    ]
                };

                // const modes = ['2012Budget', '2011Budget', 'Growth'];
                // const option = {
                //     title: {
                //         top: 5,
                //         left: 'center',
                //         text: 'How $3.7 Trillion is Spent',
                //         subtext: 'Obama’s 2012 Budget Proposal',
                //         backgroundColor: 'rgb(243,243,243)',
                //         borderRadius: [5, 5, 0, 0]
                //     },
                //
                //     legend: {
                //         data: modes,
                //         selectedMode: 'single',
                //         top: 55,
                //         itemGap: 5,
                //         backgroundColor: 'rgb(243,243,243)',
                //         borderRadius: 5
                //     },
                //
                //     tooltip: {
                //     },
                //
                //     series: modes.map(function (mode, idx) {
                //         const seriesOpt = this.createSeriesCommon(idx);
                //         seriesOpt.name = mode;
                //         return seriesOpt;
                //     })
                // };

                return(
                    <ReactEcharts showLoading={false} option={option} notMerge={true} lazyUpdate={true} />
                );
        }
    };

    renderSpecialityComparison = () => {
        switch(this.state.specialityList) {
            case null:
                return;
            default:
                const answers = this.props.answers;

                const dataMapping = [];
                for(let i = 0; i < answers.length; i++) {
                    const answer = answers[i];
                    const answerCase = answer.case;
                    const speciality = answerCase.speciality;
                    const subSpecialities = answerCase.subspeciality;

                    // Add speciality scores
                    let toAdd = true;
                    for(let i = 0; i < dataMapping.length; i++) {
                        const dataObject = dataMapping[i];
                        if(dataObject.name === speciality) {
                            dataObject.value += answer.score;
                            toAdd = false;
                            break;
                        }
                    }
                    if(toAdd){
                        dataMapping.push({
                            value: answer.score,
                            name: speciality,
                            path: speciality,
                            children: []
                        });
                    }

                    // Add sub-speciality scores
                    const specialityList = this.state.specialityList;
                    for(let j = 0; j < dataMapping.length; j++) {
                        const dataObject = dataMapping[j];
                        for(let k = 0; k < specialityList.length; k++) {
                            const fetchedSpeciality = specialityList[k];
                            if(fetchedSpeciality.speciality === dataObject.name) {
                                const fetchedSubspecialities = fetchedSpeciality.subspecialities;
                                for(let l = 0; l < fetchedSubspecialities.length; l++) {
                                    const fetchedSubspeciality = fetchedSubspecialities[l];
                                    for(let m = 0; m < subSpecialities.length; m++) {
                                        const subSpeciality = subSpecialities[m];
                                        if(subSpeciality === fetchedSubspeciality.subspeciality) {
                                            const firstLevelChildren = dataObject.children;
                                            toAdd = true;
                                            for(let n = 0; n < firstLevelChildren.length; n++) {
                                                const firstLevelChild = firstLevelChildren[n];
                                                if(firstLevelChild.name === subSpeciality) {
                                                    firstLevelChild.value += answer.score;
                                                    toAdd = false;
                                                    break;
                                                }
                                            }
                                            if(toAdd) {
                                                for(let n = 0; n < dataMapping.length; n++) {
                                                    const dataObject = dataMapping[n];
                                                    const firstLevelChildren = dataObject.children;
                                                    let hasDuplicate = false;
                                                    for(let o = 0; o < firstLevelChildren.length; o++) {
                                                        const firstLevelChild = firstLevelChildren[o];
                                                        if(firstLevelChild.name === subSpeciality) {
                                                            hasDuplicate = true;
                                                            break;
                                                        }
                                                    }
                                                    if(!hasDuplicate) {
                                                        firstLevelChildren.push({
                                                            value: answer.score,
                                                            name: fetchedSubspeciality.subspeciality,
                                                            path: fetchedSubspeciality.subspeciality,
                                                            children: []
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // Sort array of data
                const xAxisData = [];
                const seriesData = [];
                for(let i = 0; i < dataMapping.length; i++) {
                    const dataObject = dataMapping[i];
                    xAxisData.push(dataObject.name);
                    seriesData.push(dataObject.value);
                }

                const option = {
                    title: {
                        text: 'Speciality Comparison'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        name: 'Speciality',
                        type: 'category',
                        data: xAxisData
                    },
                    yAxis: {
                        name: 'Score',
                        type: 'value'
                    },
                    series: [{
                        data: seriesData,
                        type: 'bar'
                    }],
                    color: ['#56B0CB']
                };

                return(
<<<<<<< HEAD
                    <div>
                        {this.state.headerFilterDisplay}
                        <ReactEcharts onEvents={onEvents} showLoading={false} option={option} notMerge={true} lazyUpdate={true} />
                    </div>
=======
                    <ReactEcharts showLoading={false} option={option} notMerge={true} lazyUpdate={true} />
>>>>>>> parent of e8327a8... Modified Student Analytics for more concise charts
                );
        }
    };

<<<<<<< HEAD
    setSpecialityView = () => {
        this.setState({
            specialityFilterName: null,
            subSpecialityFilterName: null,
            caseDataMapping: [],
            headerFilterDisplay: <Breadcrumb><Breadcrumb.Item><Button bsSize="large" bsStyle="link" onClick={this.setSpecialityView}>All</Button></Breadcrumb.Item></Breadcrumb>
        });
    };

    setSubSpecialityView = () => {
        this.setState({
            subSpecialityFilterName: null,
            caseDataMapping: [],
            headerFilterDisplay: <Breadcrumb>
                                    <Breadcrumb.Item><Button bsSize="large" bsStyle="link" onClick={this.setSpecialityView}>All</Button></Breadcrumb.Item>
                                    <Breadcrumb.Item><Button bsSize="large" bsStyle="link" onClick={this.setSubSpecialityView}>{this.state.specialityFilterName}</Button></Breadcrumb.Item>
                                 </Breadcrumb>
        });
    };

    onBarChartClick = (params) => {
        if(this.state.specialityFilterName === null) {
            const specialityFilterName = params.name;
            this.setState({
                specialityFilterName,
                headerFilterDisplay: <Breadcrumb>
                                        <Breadcrumb.Item><Button bsSize="large" bsStyle="link" onClick={this.setSpecialityView}>All</Button></Breadcrumb.Item>
                                        <Breadcrumb.Item><Button bsSize="large" bsStyle="link" onClick={this.setSubSpecialityView}>{specialityFilterName}</Button></Breadcrumb.Item>
                                     </Breadcrumb>
            });
        } else if(this.state.subSpecialityFilterName === null) {
            const subSpecialityFilterName = params.name;
            this.setState({
                subSpecialityFilterName,
                headerFilterDisplay: <Breadcrumb>
                                        <Breadcrumb.Item><Button bsSize="large" bsStyle="link" onClick={this.setSpecialityView}>All</Button></Breadcrumb.Item>
                                        <Breadcrumb.Item><Button bsSize="large" bsStyle="link" onClick={this.setSubSpecialityView}>{this.state.specialityFilterName}</Button></Breadcrumb.Item>
                                        <Breadcrumb.Item><Button bsSize="large" bsStyle="link">{subSpecialityFilterName}</Button></Breadcrumb.Item>
                                     </Breadcrumb>
            });
        } else {
            const selectedCase = this.state.caseDataMapping[params.dataIndex];
            this.props.showCaseDetail(selectedCase.caseId);
        }
    };

=======
>>>>>>> parent of e8327a8... Modified Student Analytics for more concise charts
    render() {
        return(
            <div className="col-md-12" style={{marginTop: '20px'}}>
                <div className="col-md-12" style={{marginTop: '20px'}}>
                    {this.renderTreeMapOverview()}
                </div>
                <div className="col-md-12" style={{marginTop: '20px'}}>
                    {this.renderSpecialityComparison()}
                </div>
            </div>
        );
    }
}

export default StudentOverview;