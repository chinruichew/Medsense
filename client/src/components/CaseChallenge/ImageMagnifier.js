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
                    sizes: '(min-width: 100px)'
                },
                largeImage: {
                    alt: '',
                    src: this.props.url,
                    width: 500,
                    height: 500
                }
            }} />
        );
    }
}
export default ImageMagnifier;