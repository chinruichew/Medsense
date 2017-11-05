import React, { Component } from 'react';
class Test extends React.Component {
  constructor() {
    super();
    this.state = { open: false };
    
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div className="cart">
       <button className="btn btn-block" onClick={this.toggle.bind(this)}>
                            Q1
       </button>
        <div id="test" className={"collapse" + (this.state.open ? ' in' : '')}>
          <div>
            
              test///
          
          </div>
        </div>
      </div>
    );
  }

};

export default Test;