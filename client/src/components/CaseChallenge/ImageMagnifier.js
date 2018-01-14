import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';

class ImageMagnifier extends Component {

    render(){ 
        return(
            <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: "./CTscan.png",
                    sizes: ' (min-width: 90px)'
                },
                largeImage: {
                    alt: '',
                    src: "./CTscan.png",
                    width: 500,
                    height: 500
                }
            }} />
        );
    }
}
export default ImageMagnifier;