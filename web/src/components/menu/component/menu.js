import React from 'react';

export default () => {
    return <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="#">MAGG</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse flex-row-reverse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-0 mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
            </div>
        </nav>
        <style jsx>{`
                nav {
                    background-color: #353590;
                }
            `}</style>
    </div>
};