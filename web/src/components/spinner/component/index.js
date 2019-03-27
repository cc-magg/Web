import React from 'react';

export default props => <div className={`${props.align}`}>
    <div className={`${props.type} ${props.padding} ${props.margin} style`} role="status">
        <span className="sr-only">Loading...</span>
    </div>

    <style jsx>{`
        .style {
            color: ${props.color}
        }
    `}</style>
</div>