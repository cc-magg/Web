import React from 'react';

function RegularError(props) {
    console.log('informacion del error: ' + props.errorInfo);
    return (
        <div>
            <h3 className="header">ERROR</h3>
            <div className="errorContainer">
                <div className="errorCard">
                    <p>{props.error.toString()}</p>
                    <div className="errorLocation">
                        Here is the error: {props.errorInfo.componentStack}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .header {
                    width: 100%;
                    padding: 10px;
                    background-color: #455498;
                    color: #fff;
                    text-align: center;
                }
                .errorContainer {
                    width: 100%;
                    margin-top: 50px;
                }
                .errorCard {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                }
                .errorLocation {
                    border-radius: 5px;
                    padding: 10px;
                    background-color: #feb5b9;
                }
            `}</style>
            <style global jsx>{`
                body {
                    background-color: #87c2e3;
                }
            `}</style>
        </div>)
}

export default RegularError;