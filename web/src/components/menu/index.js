import React, { useState } from 'react';
/**
 * this is a function component but it has no container (class or smart component)
 * because here we can use the react hooks witch makes this component no longer a stateless component
 * because here we can use the useState as a state that preserve itself over the renders
 * if you need to use life cycle then use hook's effect
 * https://reactjs.org/docs/hooks-effect.html
 */

export default props => {
    const [count, setCount] = useState(0);
    const defaultBackgroundColor = '#353590';
    const handleCountChange = () => { setCount(count + 1); }

    const menuType = (props.menuType == undefined || props.menuType == '' || props.menuType == 'static') ? 'static' : (props.menuType != 'transparent') ? 'fixed' : 'transparent';
    const menuBackgroundColor = (props.menuBackgroundColor == undefined || props.menuBackgroundColor == '') ? defaultBackgroundColor : props.menuBackgroundColor;

    return <div>
        <nav className={`navbar navbar-expand-lg navbar-dark ${menuType}`}>
            <a className="navbar-brand" href="#">MAGG {/*`Home clicked ${count} times`*/}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse flex-row-reverse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-0 mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="#" onClick={handleCountChange}>Home <span className="sr-only">(current)</span></a>
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
        <style jsx>
            {`
                nav {
                    background-color: ${menuBackgroundColor};
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 2;
                }
                .transparent {
                    background-color: ${menuBackgroundColor}0f;
                    position: absolute;
                    
                }
                .fixed {
                    position: fixed;
                    -webkit-transition: background-color .5s;
                    -moz-transition: background-color .5s;
                    -o-transition: background-color .5s;
                    transition: background-color .5s;
                }
            `}
        </style>
    </div>
}