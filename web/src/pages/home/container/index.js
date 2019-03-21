import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions';

import HomeComponent from '../component';

class Home extends Component {
    state = {
        temp: 0
    }
    sendMessage = data => {
        console.log(data);
        this.props.actions.changeData(data);
    }
    render() {
        return <HomeComponent sendMessage={this.sendMessage} data={this.props.newData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);