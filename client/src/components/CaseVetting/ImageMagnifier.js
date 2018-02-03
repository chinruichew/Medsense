import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';

class ImageMagnifier extends Component {

    render(){
        return(
            <ReactImageMagnify {...{
                smallImage: {
                    alt: '',
                    isFluidWidth: true,
                    src: this.props.url,
                    sizes: '(min-width: 10px)'
                },
                largeImage: {
                    alt: '',
                    src: this.props.url,
                    width: 300,
                    height: 300
                }
            }} />
        );
    }
}
export default ImageMagnifier;