import React, { Component } from 'react';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {currentTime: new Date().toLocaleTimeString(), motivationalQuote: '', doomsdayCountdown: 0}
    }

    timer() {
        this.setState({
            currentTime: new Date().toLocaleTimeString()
        });
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
        this.setState({
            motivationalQuote: this.getMotivationalQuote(),
            doomsdayCountdown: this.getDoomsdayCountdown()
        });
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    getDoomsdayCountdown() {
        let date1 = new Date();
        let date2 = new Date("11/7/2017");
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return(diffDays);
    }

    getMotivationalQuote() {
        const quotes = ["You miss 100% of the shots you don't take. – Wayne Gretzky"
            , "The most difficult thing is the decision to act, the rest is merely tenacity. – Amelia Earhart"
            , "I attribute my success to this: I never gave or took any excuse. – Florence Nightingale"
            , "Life is 10% what happens to me and 90% of how I react to it. – Charles Swindoll"
            , "The most common way people give up their power is by thinking they don’t have any. – Alice Walker"];
        const randomNumber = Math.floor(Math.random() * quotes.length);
        return(
            <strong>
                {quotes[randomNumber]}
            </strong>
        );
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
                        <h1 style={{color: 'red'}}>
                            We have {this.state.doomsdayCountdown} days left to FYP Acceptance.
                        </h1>
                        <h2>
                            {this.state.motivationalQuote}.
                        </h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;