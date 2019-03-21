import React from 'react';

export default props => <div>
    <header>HEADER - CONTACT</header>
    <h1>Hola Mundo!</h1>
    <p>Bienvenido al curso de Next.js {(props.data)&& <span>el nuevo mensaje es {props.data}</span>}</p>
    <style jsx>{`
    header {
        text-align: center;
        background-color: #353590;
        padding: 16px;
        color: #fff;
    }`}</style>
</div>