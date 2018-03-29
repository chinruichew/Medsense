import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';

class ProfessorOverview extends Component {
    state = {
        specialityList: null
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

                const option = {

                    title: {
                        text: 'Performance Overview',
                        left: 'center'
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
                        name: 'Global Score',
                        type: 'value'
                    },
                    series: [{
                        data: seriesData,
                        type: 'bar'
                    }]
                };

                return(
                    <ReactEcharts showLoading={false} option={option} notMerge={true} lazyUpdate={true} />
                );
        }
    };

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

export default ProfessorOverview;