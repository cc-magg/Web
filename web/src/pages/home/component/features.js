import React from 'react';

import Feature from './feature';

export default () => {
    const features = {
        modeling: {
            imagePath: '/static/robot4.png',
            title: '3d modeling',
            layerColor: '#5f230040',
            buttonColor: '#234766',
            buttonColorHover: '#ed7d31',
            bottonColorText: '',
            bottonColorTextHover: '',
            redirectTo: {
                feature1: {
                    title: 'TITLE',
                    linkTo: '/about'
                },
                feature2: {
                    title: 'TITLE2',
                    linkTo: '/contact'
                },
                feature3: {
                    title: 'TITLE3',
                    linkTo: '/about'
                },
                feature4: {
                    title: 'TITLE4',
                    linkTo: '#'
                }
            }
        },
    };

    return <div className="container-fluid parallax noPadding">

        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <Feature active={true} features={features.modeling} />
                <Feature features={features.modeling} />
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>

        <style jsx>{`
        .parallax {
            /* The image used */
            background-image: url("/static/parallax.jpg");
        
            /* Set a specific height */
            /*min-height: 500px; */
        
            /* Create the parallax scrolling effect */
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;

        }
        .carousel-inner {
            min-height: 600px;
        }

        // Small devices (landscape phones, 576px and up)
        @media (min-width: 576px) {
        }
        
        // Medium devices (tablets, 768px and up)
        @media (min-width: 768px) {
            .carousel-inner {
                min-height: 500px;
            }
        }
        
        // Large devices (desktops, 992px and up)
        @media (min-width: 992px) {
        }
        
        // Extra large devices (large desktops, 1200px and up)
        @media (min-width: 1200px) {
        }
    `}</style>
    </div>
};