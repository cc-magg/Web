import React from 'react';

import Card from './proyects_cards';

export default props => {
    const color3D = '#ed7d31';
    const colorWeb = '#234766';

    return <div className="container-fluid">
        <h3 className="text-center title">SOME PROJECTS</h3>
        <div className="row justify-content-md-center maxwidth1000">
            <div className="col cardContainer"><Card title={'ZETA HOUSE'} img={'/static/casa_hongo2.png'} img_alt={'zeta_house'} linkTo={'#'} buttonColor={color3D} /></div>
            <div className="col cardContainer"><Card title={'CATALENT 2018'} img={'/static/catalentLogo.png'} img_alt={'catalent_2018'} linkTo={'#'} buttonColor={colorWeb} /></div>
            <div className="col cardContainer"><Card title={'ROBOT'} img={'/static/robot4.png'} img_alt={'robot'} linkTo={'#'} buttonColor={color3D} /></div>
            <div className="col cardContainer"><Card title={'BOSS HUNTERS'} img={'/static/boss_hunters.png'} img_alt={'boss_hunters'} linkTo={'#'} buttonColor={colorWeb} /></div>
            <div className="col cardContainer"><Card title={'HORCO'} img={'/static/horco.png'} img_alt={'horco'} linkTo={'#'} buttonColor={color3D} /></div>
        </div>
        <style jsx>{`
    .maxwidth1000 {
        max-width: 1000px;
        margin: 0 auto;
    }
    .cardContainer {
        padding-left: 0;
        padding-right: 0;
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .container-fluid {
        background-color: #f9f9f9;
        padding: 80px 40px 80px 40px;
    }
    .title {
        padding-bottom: 30px;
        color: #234766;
    }
    `}</style>
    </div>
}