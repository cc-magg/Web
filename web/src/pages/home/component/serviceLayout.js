import React from 'react';

export default props => {
    //verificar que esta parte funcione correctamente tanto el background color como el background-img
    let backgroundImgClass = props.backgroundImg ? 'backgroundImgClass' : '';
    let backgroundColorClass = props.backgroundColor ? 'backgroundColorClass' : '';

    return <div id={props.futureID} className={`${backgroundImgClass} ${backgroundColorClass} text-center`}>

        <div className="container">
            {(props.title || props.subtitle)&& <div style={{ paddingTop: 50 }}>{props.title && <h2>{props.title}</h2>}{props.subtitle && <h5>{props.subtitle}</h5>}</div>}

            <div className="row vertical-align">
                {props.children}
            </div>
        </div>

        {props.path && <img className="img" src={`${props.path}`} />}

        <style jsx>{`
            .img {
                width: 100%;
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
        `}</style>
    </div >
};