import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import Menu from '../../../components/menu';
import CanvasHeader from './canvas';
import Spinner from '../../../components/spinner';
import ServicesCard from './servicesCardContainer';
import Services_web_development from './Services_web_development';
import Some_proJects from './some_proJects';

export default props => {
    //WEB COLORS
    const c1 = '#4E9FE6'; //blue principal
    const c2 = '#234766'; //blue dark for text and backgrounds
    const c3 = '#96C2EA'; //blue light
    const c4 = '#415566'; //blue-black for text
    const c5 = '#3D7CB3'; //blue 
    const c6 = '#ed7d31'; //orange

    const c7 = '#ffffff'; //white
    const c8 = '#000000'; //black
    const c9 = '#e7e7e7'; //light

    //REFS
    const canvasRef = useRef(null);

    // this section included the useEffect is just to change the menu background color on scroll
    const defaultMenuBackgroundColor = c1;
    const menuHeight = 56; //can be diferent if logo is added
    const menuType = 'fixed'; //this could be static, transparent or fixed

    //STATES
    const [menuBackgroundColor, setmenuBackgroundColor] = useState(`${defaultMenuBackgroundColor}0f`);
    const [windowHeight, setwindowHeight] = useState(0);

    useEffect(() => {
        windowHeight != window.innerHeight && setwindowHeight(window.innerHeight);
        //this is done just to change the menu color on scroll
        let canvas = canvasRef.current.getBoundingClientRect();
        const headerHeight = canvas.height;

        window.addEventListener('scroll', () => {
            if (menuType == 'fixed') {
                //for the menu to appear after the canvas
                if (pageYOffset >= headerHeight - menuHeight) {
                    menuBackgroundColor != defaultMenuBackgroundColor && setmenuBackgroundColor(defaultMenuBackgroundColor);
                } else {
                    menuBackgroundColor != `${defaultMenuBackgroundColor}0f` && setmenuBackgroundColor(`${defaultMenuBackgroundColor}0f`);
                }
            }
        });
    });

    return <div>
        <Menu
            menuType={menuType}
            menuBackgroundColor={menuBackgroundColor}    //to avoid the change of colors (but not the inside maths) just change this menuBackgroundColor to defaultMenuBackgroundColor  or backwards
        />

        {/*canvas header*/}
        <div className="headerContainer">
            <div className="headerTextContainer">
                <h1>HEADER</h1>
                <h6 className="thin">THIS IS A HEADER</h6>
            </div>
            <div ref={canvasRef} className="canvasContainer">
                <CanvasHeader menuHeight={menuType == 'static' ? menuHeight : 0} />
            </div>
        </div>

        <div className="mainContainer">
            {/*what we do*/}
            <div className="whatWeDoSection">
                <div className="text-center">
                    <h3>What <span style={{ color: c4 }}><u>w</u></span><span style={{ color: c6 }}><u>e</u></span> do?</h3>
                    <p>We work for your satisfaction</p>
                </div>

                <ServicesCard borderColor={c2}>
                    <div className="col-sm text-center">
                        <h4>¡WEBSITES!</h4>
                        <p className="whoWeAreText">Incredible, comfortable, friendly, fast and responsive websites for your company, startup, product or whatever you need
                                <br /><br />!What are you waiting for?</p>
                    </div>
                    <div className="col-sm text-center">
                        <img className="maxWidth150px" src="/static/web-responsive.png" />
                    </div>
                </ServicesCard>
                <ServicesCard borderColor={c5}>
                    <div className="col-sm text-center">
                        <h4>¡3D MODELING!</h4>
                        <p className="whoWeAreText">Incredible, comfortable, friendly, fast and responsive websites for your company, startup, product or whatever you need
                                <br /><br />!What are you waiting for?</p>
                    </div>
                    <div className="col-sm text-center">
                        <img className="maxWidth150px" src="/static/3d.png" />
                    </div>
                </ServicesCard>
            </div>

            {/*services 1*/}
            <div className="container-fluid">
                <div className="row vertical-align">
                    <div id="columnLeft1" className="col-3 borderLight" style={{ height: windowHeight - menuHeight, backgroundColor: 'white', position: 'sticky', top: menuHeight }}>
                        <div style={{ position: 'relative', height: '100%' }}>
                            <div className="full_center text-center">
                                <p className="italic">services</p>
                            </div>

                            <div style={{ position: 'absolute', bottom: 10, width: '100%' }}>
                                <div id="track" className="noPadding container list-group mx-auto justify-content-center track">
                                    <div className="row justify-content-md-center" style={{ padding: 5 }}>
                                        <div className="col-md-auto">
                                            <a className="list-group-item col text-center padding5" href="#a">web app</a>
                                        </div>
                                        <div className="col-md-auto">
                                            <a className="list-group-item col text-center padding5" href="#b">wordpress</a>
                                        </div>
                                        <div className="col-md-auto">
                                            <a className="list-group-item col text-center padding5" href="#c">SEO</a>
                                        </div>

                                        {/*<a className="list-group-item col text-center noPadding" href="#a"><img src="/static/wordpress_icon_menu_gray.png" className="imageLeftMenu" /></a>
                                        <a className="list-group-item col text-center noPadding" href="#b"><img src="/static/wordpress_icon_menu.png" className="imageLeftMenu" /></a>
                                        <a className="list-group-item col text-center noPadding" href="#c"><img src="/static/wordpress_icon_menu_gray.png" className="imageLeftMenu" /></a>
                                        <a className="list-group-item col text-center noPadding" href="#d"><img src="/static/wordpress_icon_menu_gray.png" className="imageLeftMenu" /></a>
                                        <a className="list-group-item col text-center noPadding" href="#e"><img src="/static/wordpress_icon_menu_gray.png" className="imageLeftMenu" /></a>*/}
                                    </div>
                                    <div className="row justify-content-md-center" style={{ padding: 5 }}>
                                        <div className="col-md-auto">
                                            <a className="list-group-item col text-center padding5" href="#d">3d fantasy</a>
                                        </div>
                                        <div className="col-md-auto">
                                            <a className="list-group-item col text-center padding5" href="#e">3d architecture</a>
                                        </div>
                                    </div>
                                    {/*<a className="list-group-item" href="#a">web app</a>
                                    <a className="list-group-item" href="#b">wordpress</a>
                                    <a className="list-group-item" href="#c">SEO</a>*/}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col noPadding" style={{ position: 'relative' }}>
                        <Services_web_development colorDark={c2} colorLight={c9} />
                    </div>
                </div>
            </div>

            {/*some projects*/}
            <Some_proJects />

            <p>{props.data}</p>
            <button type="button" className="btn btn-primary" onClick={() => props.sendMessage('mensaje nuevo')}>agregar dato</button><br />
            <Link href="/contact">
                <a>ir a contact</a>
            </Link>
            <Spinner
                type={'spinner-grow'}
                color={'blue'}
                align={'text-center'}
            />
        </div>

        <style jsx>{`
            #columnLeft1, #columnLeft2 {
                display: none;
            }

            // Small devices (landscape phones, 576px and up)
            @media (min-width: 576px) {
                #columnLeft1, #columnLeft2 {
                    display: none;
                }
            }
            
            // Medium devices (tablets, 768px and up)
            @media (min-width: 768px) {
                #columnLeft1, #columnLeft2 {
                    display: block;
                }
            }
            
            // Large devices (desktops, 992px and up)
            @media (min-width: 992px) {
                #columnLeft1, #columnLeft2 {
                    display: block;
                }
            }
            
            // Extra large devices (large desktops, 1200px and up)
            @media (min-width: 1200px) {
                #columnLeft1, #columnLeft2 {
                    display: block;
                }
            }
            
            .padding5 {
                padding-right: 5px;
                padding-left: 5px;
            }
            .imageLeftMenu {
                max-width: 50px;
            }
            .list-group-item {
                font-size: 13px;
                color: ${c3};
                background-color: white;
                border: none;
                padding-top: 0;
                padding-bottom: 0;
            }
            .list-group-item.active {
                color: ${c6};
                background-color: initial;
                border-color: initial;
            }
            .full_center {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .whoWeAreText {
                font-size: 0.8rem;
            }
            .noPadding {
                padding-right:0;
                padding-left:0;
            }
            .nav {
                color: ${c7};
            }
            .mainContainer {
            }
            .headerContainer {
                background-image: url(/static/backgroundDemo.jpg);
                position: relative;
                width: 100%;
                overflow: hidden;
                background-size: cover;
                background-position: center center;
                z-index: 1;
            }
            .headerTextContainer {
                position: absolute;
                margin: 0;
                padding: 0;
                color: ${c7};
                text-align: center;
                top: 50%;
                left: 50%;
                -webkit-transform: translate3d(-50%,-50%,0);
                transform: translate3d(-50%,-50%,0);
            }
            .canvasContainer {
                background-color: #33333329;
            }
            .thin {
                font-weight: 200;
            }
            .whatWeDoSection {
                width: 100%;
                background-image: url(/static/background_gray.jpg);
                position: relative;
                overflow: hidden;
                background-size: cover;
                background-position: center center;
                padding: 70px 20px 20px 20px;
            }
            .maxWidth150px {
                max-width: 150px;
            }
            .center_vertically {
                margin-top: 90%;
            }
            .borderLight {
                border: 1px solid #e5e5e5;
            }
        `}</style>
        <style jsx global>{`
            body {
                background: ${c7};
                color: #403b3b;
                line-height: 1.35;
            }
            div, p, span, a  {
                font-family: 'Montserrat', sans-serif;
            }
            h1, h2, h3, h4, h5, h6{
                font-family: 'Sorts Mill Goudy', serif;
            }
            .italic {
                font-family: 'Sorts Mill Goudy';
                font-style: italic;
                font-size: 25px;
            }
        `}</style>
    </div>
}