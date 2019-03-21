import React, { Component } from 'react';

import RegularError from '../component/regular-error.js';

class HandleError extends Component {
    state = {
        handleError: false,
        errorInfo: '',
        error: ''
    }
    componentDidCatch = (error, errorInfo) => {
        this.setState({
            handleError: true,
            errorInfo,
            error
        });
    }
    render() {
        if (this.state.handleError) {
            return <RegularError errorInfo={this.state.errorInfo} error={this.state.error} />
        } else {
            return (<div>{this.props.children}</div>)
        }
    }
}

export default HandleError;