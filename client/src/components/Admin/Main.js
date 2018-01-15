import React, { Component } from 'react';

class Main extends Component {
    state = {
        authid: this.props.authid,
        authname: this.props.authname
    };

    render() {
        return(
            <div>
                Hello World!
            </div>
        );
    }
}
export default Main;