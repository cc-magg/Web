import React from 'react';

export default props => {
    let widthFor3D = props.buttonColor == '#ed7d31'? '70%' : 'auto';
    return <div>
        <div className="card">
            <div style={{height: 300}}>
                <h6 className="card-title text-center">{props.title}</h6>
                <img src={props.img} className="card-img-top" alt={props.img_alt} style={{width: widthFor3D}}/>
            </div>

            <a href={props.linkTo} className="btn btn-primary button">SEE MORE</a>
        </div>

        <style jsx>{`
        .card {
            width: 250px;
            margin: 0 auto;
            border: 0;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
        }
        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        .card-img-top {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .card-title {
            padding-top: 40px;
            color: #234766;
            font-size: 14px;
        }
        .button {
            padding: 10px;
            border-radius: 0;
            background-color: ${props.buttonColor};
            border-color: ${props.buttonColor};
            font-size: 0.8rem;
        }

        // Small devices (landscape phones, 576px and up)
        @media (min-width: 576px) {
        }
        
        // Medium devices (tablets, 768px and up)
        @media (min-width: 768px) {
            .card {
                width: 180px;
            }
        }
        
        // Large devices (desktops, 992px and up)
        @media (min-width: 992px) {
        }
        
        // Extra large devices (large desktops, 1200px and up)
        @media (min-width: 1200px) {
        }
        `}</style>
    </div>
};