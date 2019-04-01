import React from 'react';
import Link from 'next/link';

import Menu from '../../../components/menu';
import Spinner from '../../../components/spinner';

export default props => <div>
    <Menu />
    <div className="mainContainer">
        <h1>Hola Mundo!</h1>
        <p>{props.data}</p>
        <button type="button" className="btn btn-primary" onClick={() => props.sendMessage('mensaje nuevo')}>agregar dato</button><br />
        <Link href="/contact">
            <a>ir a contact</a>
        </Link>
        <Spinner
            type={'spinner-grow'}
            color = {'blue'}
            align = {'text-center'}
        />
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