import React, { Component } from 'react';

import ComponentSpinner from '../component';

class Spinner extends Component {
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
    render() {
        //  in case the type is diferent than the 2 alowed types then it'll be changed to spinner-border
        const type = (this.props.type != 'spinner-border' && this.props.type != 'spinner-grow')? 'spinner-border' : this.props.type;
        //console.log('%c type '+this.props.type,'color: #bbb612');
        return <ComponentSpinner
            type={type}
            color={(this.props.color == undefined || this.props.color == '')? 'text-primary' : this.props.color}
            align={(this.props.align == undefined)? '' : this.props.align}
            margin={(this.props.margin == undefined)? '' : this.props.margin}
            padding={(this.props.padding == undefined)? '' : this.props.padding}
        />
    }
}

export default Spinner;