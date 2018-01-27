import React, { Component } from 'react';
import { Button, Row } from 'react-bootstrap';

class GameResults extends Component {

    renderContent(){ 
        return(
            <div >

                {/* <h1> Bloody Episode </h1> 

                <br /><br />

                <div align="center">
                    <h1> You have earned 200 / 350 XP! </h1>
                </div>

                <br /><br />

                <h3>
                    <img src="./ThumbsUp.png" hspace='5' alt="" style={{ height: "30px" }} />
                    Learning Points
                </h3><br />
                <h4> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. It has survived not only five centuries, but also the leap into 
                    electronic typesetting, remaining essentially unchanged.
                </h4> 

                <br /><br />

                <h3>
                    Question 1
                </h3> */}
                <Row className="text-center"><h1> Thank you for completing the case. </h1> </Row>
                
                    
            </div>
        );
    }
    
    renderDiscussionForum(){ 
        return(
            <div className='container' align="justify">
                <h3> Have a question to ask? </h3> 
                <Button   bsStyle="primary" bsSize="large">
                    Start a discussion post!
                </Button>
            </div> 
        );
    }

    render() {
        return(
            <div className='container'>
                <br /><br /><br /><br />
                {this.renderContent()}
                
                {/* {this.renderDiscussionForum()} */}
            </div>
        );
    }
}

export default GameResults;