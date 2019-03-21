import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as actions from '../src/redux/actions';

import Home from '../src/pages/home/container';

class HomePage extends Component {
    state = {
        temp: 0
    }
    render () {
        return <Home />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);