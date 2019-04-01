import React from 'react';

export default props => {
    const type = (props.type != 'spinner-border' && props.type != 'spinner-grow') ? 'spinner-border' : props.type;
    const color = (props.color == undefined || props.color == '') ? 'blue' : props.color;
    const align = (props.align == undefined) ? '' : props.align;
    const margin = (props.margin == undefined) ? '' : props.margin;
    const padding = (props.padding == undefined) ? '' : props.padding;

    //had to use react inline css for the color because there is a need for testing the default values and jest can't access to the class values but it can access to the props
    return <div className={`${align}`}>
        <div id='colorContainer' className={`${type} ${padding} ${margin}`} style={{color: `${color}`}} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
};

/**colors:
 * blue                = text-primary
 * dark gray           = text-secondary
 * green               = text-success
 * red                 = text-danger
 * yellow              = text-warning
 * light blue          = text-info
 * gray                = text-light
 * negro               = text-dark
 * or a regular css color
*/

/**types:
 * growing spinner     = spinner-grow
 * clasic loading      = spinner-border
*/

/**align:
 * left                = text-left
 * center              = text-center
 * right               = text-right
 *
 * for margins/paddings https://getbootstrap.com/docs/4.3/utilities/spacing/ example
 * for floats or flex insted of text-align (witch is the one we are using) https://getbootstrap.com/docs/4.3/components/spinners/#placement
*/