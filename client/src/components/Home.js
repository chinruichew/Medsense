import React, { Component } from 'react';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {currentTime: new Date().toLocaleTimeString()}
    }

    timer() {
        this.setState({
            currentTime: new Date().toLocaleTimeString()
        });
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>
                            Welcome to Medsense!
                        </h1>
                        <h1>
                            The time now is {this.state.currentTime}.
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;