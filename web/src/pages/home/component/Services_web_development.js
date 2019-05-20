import React from 'react';

import SectionLayout from './serviceLayout';

export default props => <div>
    <h3 className="services_title text-center">SERVICES</h3>
    <SectionLayout futureID={'a'} backgroundImg={'/static/background_abstract2.jpg'} path={'/static/azulOscuro-azulClaro3.png'}>
        <div className="col-12 col-md-6 order-2 order-md-1 my-auto">
            <img className="image_service_sections" src="/static/webdesign-1.png" />
        </div>
        <div className='col-12 col-md-6 order-1 order-md-2 colorDark  my-auto'>
            <h4>Web application</h4>
            <p>A web application (or "web app" for short) is any computer program that performs a specific function by using a web browser as its client. The application can be as simple as a message board or a contact form on a website or as complex as a word processor or an Enterprise Resourse Planing (ERP).</p>
        </div>
    </SectionLayout>

    <SectionLayout futureID={'b'} backgroundColor={'#234766'} path={'/static/blanco-naranja.png'}>
        <div className="col-12 col-md-6  order-2 order-md-1  my-auto">
            <img className="image_service_sections" src="/static/wordpress.jpg" />
        </div>
        <div className='col-12 col-md-6  order-1 order-md-2  colorLight  my-auto'>
            <h4>Wordpress web site (creation, update or  actualization)</h4>
            <p>If your bisness need a simple web site (to show your products or services to your clients), fast and you want to be beable to modify it by your self then you need a wordpress web site.</p>
        </div>
    </SectionLayout>

    <SectionLayout futureID={'c'}>
        <div className="col-12 col-md-6  order-2 order-md-1  my-auto">
            <img className="image_service_sections" src="/static/seo.png" />
        </div>
        <div className='col-12 col-md-6  order-1 order-md-2  colorDark  my-auto'>
            <h4>Wordpress web site (creation, update or  actualization)</h4>
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
        <div className="col-12 col-md-6  order-2 order-md-1  my-auto">
            <img className="image_service_sections" src="/static/horco.png" />
        </div>
        <div className='col-12 col-md-6  order-1 order-md-2  colorDark  my-auto'>
            <img className="a3dScene" src="/static/escena3d.jpg" />
        </div>
    </SectionLayout>

    <SectionLayout futureID={'e'} backgroundColor={'#234766'}>
        <div className="col-12 col-md-6  order-2 order-md-1  my-auto">
            <img className="image_service_sections" src="/static/casa_prefabricada.png" />
        </div>
        <div className='col-12 col-md-6  order-1 order-md-2  colorLight  my-auto'>
            <h4>3D architecture</h4>
            <p>3D architecture with real measurements</p>
        </div>
    </SectionLayout>


    <style jsx>
        {`
            .services_title {
                display: block;
                padding: 20px;
                color: #f7f7f7;
                background-color: #234766;
            }
            .a3dScene {
                max-width: 100%;
            }
            .image_service_sections {
                max-width: 100%;
            }
            .colorLight {
                color: ${props.colorLight}
            }
            .colorDark {
                color: ${props.colorDark}
            }

            // Small devices (landscape phones, 576px and up)
            @media (min-width: 576px) {
            }
            
            // Medium devices (tablets, 768px and up)
            @media (min-width: 768px) {
                .services_title {
                    display: none;
                }
                .image_service_sections {
                    max-width: 250px;
                }
                .a3dScene {
                    max-width: 400px;
                }
            }
            
            // Large devices (desktops, 992px and up)
            @media (min-width: 992px) {
            }
            
            // Extra large devices (large desktops, 1200px and up)
            @media (min-width: 1200px) {
            }
        `}
    </style>
</div>