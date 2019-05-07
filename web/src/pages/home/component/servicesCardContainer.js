import React from 'react';

export default props => {
    let borderColor = props.borderColor? props.borderColor : '234766';
    return <div className="cardContainer noPadding">
        <div className="arrowleft"></div>
        <div className="container">
            <div className="row vertical-align">
                {props.children}
            </div>
        </div>
        <div className="arrowRight"></div>
        <style jsx>{`
            .cardContainer {
                background-color: #fff;
                max-width: 600px;
                padding: 30px;
                margin: 40px auto;
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }
            .vertical-align {
                display: flex;
                align-items: center;
            }
            .arrowleft {
                width: 0;
                height: 0;
                border-top: 0;
                border-bottom: 60px solid transparent;
                border-left: 80px solid ${borderColor};
            }
            .arrowRight {
                height: 0;
                border-top: 60px solid transparent;
                border-bottom: 0;
                border-right: 80px solid ${borderColor};
            }
            .noPadding {
                padding: 0;
            }`
        }</style>
    </div>
}