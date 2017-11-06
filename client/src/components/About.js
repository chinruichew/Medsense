import React, { Component } from 'react';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {currentTime: new Date().toLocaleTimeString(), motivationalQuote: '', doomsdayCountdown: ''}
    }

    timer() {
        this.setState({
            currentTime: new Date().toLocaleTimeString(),
            doomsdayCountdown: this.getDoomsdayCountdown()
        });
    }

    componentDidMount() {
        // Dynamically set background image
        document.body.style.backgroundImage = "url('./home_background.jpg')";
        document.body.style.backgroundSize = "100% 1200px";

        this.intervalId = setInterval(this.timer.bind(this), 1000);
        this.setState({
            motivationalQuote: this.getMotivationalQuote()
        });
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    getDoomsdayCountdown() {
        let date1 = new Date();
        let date2 = new Date("November 7, 2017 10:00:00");
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let seconds = (timeDiff / 1000).toFixed(0);
        let minutes = Math.floor(seconds / 60);
        let hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        let countdown = "";
        if (hours !== "") {
            countdown = hours + " hours, " + minutes + " minutes and " + seconds + " seconds";
        } else {
            countdown = minutes + " minutes and " + seconds + " seconds"
        }
        return "We have " + countdown + " left to FYP Acceptance.";
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
            <div className="container-fluid">
                {/*<div className="row">*/}
                    {/*<div className="col-md-12 text-center">*/}
                        {/*<h1>*/}
                            {/*Welcome to Medsense!*/}
                        {/*</h1>*/}
                        {/*<h1>*/}
                            {/*The time now is {this.state.currentTime}.*/}
                        {/*</h1>*/}
                        {/*<h1 style={{color: 'red'}}>*/}
                            {/*{this.state.doomsdayCountdown}*/}
                        {/*</h1>*/}
                        {/*<h2>*/}
                            {/*{this.state.motivationalQuote}*/}
                        {/*</h2>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 text-center">
                        <img src="./medsense_logo.png" style={{height: '200px', width: '550px'}} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 text-center main-login" style={{backgroundColor: 'rgba(255,255,255,0.4)'}}>
                        <h3>
                            Medsense is a gamified learning platform for medical students in Singapore. It was developed as a collaboration between NUS Yong Loo Lin School of Medicine, and Singapore Management University. This platform is a web application that simulates interaction with "patients", facilitates peer learning via a discussion board, and allow Professors to track the performance of students anonymously.
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;