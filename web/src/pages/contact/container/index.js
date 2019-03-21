import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions';

import ContactComponent from '../component';

class Contact extends Component {
    render() {
        return <ContactComponent data={this.props.newData} />
    }
}

function mapStateToProps(state, props) {
    return {
        newData: state.get('data').get('message')
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);