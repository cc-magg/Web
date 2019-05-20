import React from 'react';

export default () => <div className="footerContainer container-fluid text-center">
    <p>Copyright © 2019 development | <a href='#'>política de privacidad</a></p>

    <style jsx>{`
        .footerContainer {
            background-color: #f9f9f9;
            color: #a1a1a1;
            padding: 40px;
            font-size: .8rem;
        }
        a {
            color: #a1a1a1;
        }
        a:hover {
            color: #0056b3;
        }
        p {
            margin-bottom: 0;
        }
    `}</style>
</div>