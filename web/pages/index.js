import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as actions from '../src/redux/actions';

import Home from '../src/pages/home/container';

class HomePage extends Component {
    state = {
        temp: 0
    }
    componentDidMount = () => {
        /*if ("serviceWorker" in navigator) {
            try {
                navigator.serviceWorker.register("/sw.js");
                console.log("Service worker registrated");
            } catch (error) {
                console.error("Service worker registration failed "+error);
            }
        } else {
            console.log("Service worker not supported");
        }*/
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").then(reg => {
                // registration worked
                console.log('Registration succeeded. Scope is ' + reg.scope);
            }).catch(error => {
                // registration failed
                console.log('Registration failed with ' + error);
            });
        }
    }
    render() {
        return <Home />
    }
}

function mapStateToProps(state, props) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);