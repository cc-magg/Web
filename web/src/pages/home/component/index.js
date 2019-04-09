import React from 'react';
import Link from 'next/link';

import Menu from '../../../components/menu';
import CanvasHeader from './canvas';
import Spinner from '../../../components/spinner';

export default props => <div>
    <Menu />
    <div className="headerContainer">
        <div className="headerTextContainer">
            <h1>HEADER</h1>
            <h6 className="thin">THIS IS A HEADER</h6>
        </div>
        <div className="canvasContainer">
            <CanvasHeader />
        </div>
    </div>

    <div className="mainContainer">
        <h1>Hola Mundo!</h1>
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
    .nav {
        background-color: #353590;
        color: #fff;
    }
    .mainContainer {
        padding: 20px;
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
        color: #ffffff;
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
    }`}</style>
</div>