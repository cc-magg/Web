import React from 'react';

import Router from 'next/router';

export default props => {

    return <div className={`carousel-item ${props.active ? 'active' : ''}`}>
        <div className="layer positionCenter"></div>
        <div className="container-fluid positionCenter" style={{ maxWidth: '70%' }}>
            <div className="row align-items-center">
                <div className="col-12 col-md-4">
                    <img className="carousel_image" src={`${props.features.imagePath}`} />
                </div>
                <div className="col-12 col-md-8">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col feature" onClick={() => Router.push(`${props.features.redirectTo.feature1.linkTo}`)}>{props.features.redirectTo.feature1.title}</div>
                            <div className="col feature" onClick={() => Router.push(`${props.features.redirectTo.feature2.linkTo}`)}>{props.features.redirectTo.feature2.title}</div>
                            <div className="w-100"></div>
                            <div className="col feature" onClick={() => Router.push(`${props.features.redirectTo.feature3.linkTo}`)}>{props.features.redirectTo.feature3.title}</div>
                            <div className="col feature" onClick={() => Router.push(`${props.features.redirectTo.feature4.linkTo}`)}>{props.features.redirectTo.feature4.title}</div>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="carousel_title">{`${props.features.title&& props.features.title}`}</h3>
        </div>

        <style jsx>{`
            .feature {
                padding: 20px;
                background-color: ${props.buttonColor ? props.buttonColor : '#234766'};
                color: ${props.bottonColorText ? props.bottonColorText : '#ffffff'};
                text-transform: uppercase;
                margin: 3px;
                
                -webkit-transition: background-color .3s ease-out;
                -moz-transition: background-color .3s ease-out;
                -o-transition: background-color .3s ease-out;
                transition: background-color .3s ease-out;
            }
            .feature:hover {
                cursor: pointer;
                background-color: ${props.buttonColorHover ? props.buttonColorHover : '#ed7d31'};
                color: ${props.bottonColorTextHover ? props.bottonColorTextHover : '#ffffff'};
            }
            .positionCenter {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .layer {
                background-color: ${props.layerColor ? props.layerColor : '#00000040'};
                width: 100%;
                height: 100%;
            }
            .carousel_title {
                text-transform: uppercase;
                font-weight: bold;
                color: white;
                margin-top: 30px;
                margin-bottom: 30px;
            }
            .carousel-item {
                text-align: center;
                height: 100%;
                position: absolute;
            }
            .carousel_image {
                max-width: 100%;
            }

            // Small devices (landscape phones, 576px and up)
            @media (min-width: 576px) {
                .carousel_image {
                    max-width: 50%;
                }
            }
            
            // Medium devices (tablets, 768px and up)
            @media (min-width: 768px) {
                .feature {
                    padding: 50px;
                }
                .carousel_image {
                    max-width: 100%;
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