import React from 'react';
import Link from 'next/link';

import Menu from '../../../components/menu/container/menu';

export default props => <div>
    <Menu />
    <div className="mainContainer">
        <h1>Hola Mundo!</h1>
        <p>Bienvenido al curso de Next.js {props.data}</p>
        <button type="button" className="btn btn-primary" onClick={() => props.sendMessage('mensaje nuevo')}>agregar dato</button><br />
        <Link href="/contact">
            <a>ir a contact</a>
        </Link>
    </div>

    <style jsx>{`
    .nav {
        background-color: #353590;
        color: #fff;
    }
    .mainContainer {
        padding: 20px;
    }`}</style>
</div>