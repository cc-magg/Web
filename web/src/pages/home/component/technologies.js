import React from 'react';

export default () => {
    const technologies = [
        {
            image_path: '/static/logo512.png',
            title: 'title'
        },
        {
            image_path: '/static/logo512.png',
            title: 'title'
        },
        {
            image_path: '/static/logo512.png',
            title: 'title'
        },
        {
            image_path: '/static/logo512.png',
            title: 'title'
        },
        {
            image_path: '/static/logo512.png',
            title: 'title'
        },
        {
            image_path: '/static/logo512.png',
            title: 'title'
        },
        {
            image_path: '/static/logo512.png',
            title: 'title'
        },
        {
            image_path: '/static/logo512.png',
            title: 'title'
        },
    ];

    let items = '';
    let indicators = '';
    if (technologies.length > 6) {
        //splits the technologies array in groups of 6
        let result = [];
        for (let index = 0; index < technologies.length; index += 6) {
            result.push(technologies.slice(index, index + 6));
        }

        //creates the carousel items with groups of 6
        items = result.map((element, index) => <div className={`carousel-item ${index == 0 && 'active'}`} key={index}>
            <div className="container">
                <div className="row align-items-center">
                    {element.map((technologie, key) => <div className="col" key={key}><img style={{maxWidth: 100}} src={technologie.image_path} alt={technologie.title}/></div>)}
                </div>
            </div>
        </div>);

        //creates the indicators for the carousel acording to the number of groups of 6
        indicators = result.map((element, index) => {
            return <li data-target="#carouselTechnologies" style={{backgroundColor: '#234766'}} key={index} data-slide-to={`${index}`} className={index == 0 ? 'active' : ''}></li>
        });
    } else {
        //creates just 1 carousel item
        items = (<div className="carousel-item active">
            <div className="container">
                <div className="row align-items-center">
                    {technologies.map((technologie, key) => <div className="col" key={key}><img style={{maxWidth: 100}} src={technologie.image_path}  alt={technologie.title}/></div>)}
                </div>
            </div>
        </div>);
    }

    return <div className="container-fluid noPadding text-center techsContainer">
        <h3 className="title">SOME TECHNOLOGIES</h3>

        <div id="carouselTechnologies" className="carousel slide" data-ride="carousel">
            {/*<ol className="carousel-indicators">
                {indicators}
</ol>*/}
            <div className="carousel-inner">
                {items}
            </div>
        </div>

        <style jsx>{`
            #carouselTechnologies {
                max-width: 800px;
                margin: 0 auto;
            }
            /*.carousel-inner {
                min-height: 200px;
                padding-bottom: 80px;
            }*/
            .techsContainer {
                padding-top: 50px;
                padding-bottom: 50px;
                background-color: #e7e7e7;
            }
            .title {
                margin-bottom: 30px;
                color: #234766;
            }
    `}</style>
    </div>
};