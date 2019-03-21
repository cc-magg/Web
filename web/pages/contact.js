import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as actions from '../src/redux/actions';

import Contact from '../src/pages/contact/container';

class ContactPage extends Component {
    render () {
        return <Contact />
    }
}

function mapStateToProps (state, props) {
    return {
    }
}
function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);