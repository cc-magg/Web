import React from 'react';

import SectionLayout from './serviceLayout';

export default props => <div>
    <SectionLayout futureID={'a'} backgroundImg={'/static/background_abstract2.jpg'} path={'/static/azulOscuro-azulClaro3.png'}>
        <div className="col my-auto">
            <img className="maxWidth250" src="/static/webdesign-1.png" />
        </div>
        <div className='col colorDark  my-auto'>
            <h3>WEB APPLICATION</h3>
            <p>A web application (or "web app" for short) is any computer program that performs a specific function by using a web browser as its client. The application can be as simple as a message board or a contact form on a website or as complex as a word processor or an Enterprise Resourse Planing (ERP).</p>
        </div>
    </SectionLayout>

    <SectionLayout futureID={'b'} backgroundColor={'#234766'} path={'/static/blanco-naranja.png'}>
        <div className="col my-auto">
            <img className="maxWidth250" src="/static/wordpress.jpg" />
        </div>
        <div className='col colorLight  my-auto'>
            <h3>Wordpress web site (creation, update or  actualization)</h3>
            <p>If your bisness need a simple web site (to show your products or services to your clients), fast and you want to be beable to modify it by your self then you need a wordpress web site.</p>
        </div>
    </SectionLayout>

    <SectionLayout futureID={'c'}>
        <div className="col my-auto">
            <img className="maxWidth250" src="/static/seo.png" />
        </div>
        <div className='col colorDark  my-auto'>
            <h3>Wordpress web site (creation, update or  actualization)</h3>
            <p>If your bisness need a simple web site (to show your products or services to your clients), fast and you want to be beable to modify it by your self then you need a wordpress web site.</p>
        </div>
    </SectionLayout>

    <SectionLayout
        futureID={'d'}
        backgroundImg={'/static/background_abstract2.jpg'}
        path={'/static/azulOscuro-azulClaro3.png'}
        title={'3D fantasy'}
        subtitle={'3D recreation of any kind of figure and scene from 2D to 3D'}
    >
        <div className="col my-auto">
            <img className="maxWidth250" src="/static/horco.png" />
        </div>
        <div className='col colorDark  my-auto'>
            <img src="/static/escena3d.jpg" style={{maxWidth: 400}}/>
        </div>
    </SectionLayout>

    <SectionLayout futureID={'e'} backgroundColor={'#234766'}>
        <div className="col my-auto">
            <img className="maxWidth250" src="/static/casa_prefabricada.png" />
        </div>
        <div className='col colorLight  my-auto'>
            <h3>3D architecture</h3>
            <p>3D architecture with real measurements</p>
        </div>
    </SectionLayout>


    <style jsx>
        {`
            .maxWidth250 {
                max-width: 250px;
            }
            .colorLight {
                color: ${props.colorLight}
            }
            .colorDark {
                color: ${props.colorDark}
            }
        `}
    </style>
</div>