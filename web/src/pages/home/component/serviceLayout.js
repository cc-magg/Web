import React from 'react';

export default props => {
    //verificar que esta parte funcione correctamente tanto el background color como el background-img
    let backgroundImgClass = props.backgroundImg ? 'backgroundImgClass' : '';
    let backgroundColorClass = props.backgroundColor ? 'backgroundColorClass' : '';

    return <div id={props.futureID} className={`${backgroundImgClass} ${backgroundColorClass} text-center service_section_container`}>

        <div className="container">
            {(props.title || props.subtitle)&& <div style={{ paddingTop: 50 }}>{props.title && <h3>{props.title}</h3>}{props.subtitle && <h5>{props.subtitle}</h5>}</div>}

            <div className="row vertical-align">
                {props.children}
            </div>
        </div>

        {props.path && <img className="img" src={`${props.path}`} />}

        <style jsx>{`
            .service_section_container {
                padding: 50px;
            }
            .img {
                width: 100%;
                display: none;
            }
            .backgroundImgClass {
                width: 100%;
                background-image: url(${props.backgroundImg});
                position: relative;
                overflow: hidden;
                background-size: cover;
                background-position: center center;
            }
            .backgroundColorClass {
                background-color: ${props.backgroundColor};
            }
            .row {
                min-height: 350px;
            }
            
            // Small devices (landscape phones, 576px and up)
            @media (min-width: 576px) {
            }
            
            // Medium devices (tablets, 768px and up)
            @media (min-width: 768px) {
                .img {
                    display: block;
                }
                .service_section_container {
                    padding: 0;
                }
            }
            
            // Large devices (desktops, 992px and up)
            @media (min-width: 992px) {
            }
            
            // Extra large devices (large desktops, 1200px and up)
            @media (min-width: 1200px) {
            }
        `}</style>
    </div >
};