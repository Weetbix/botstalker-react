import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MessageList from './MessageList';

class ChannelPage extends Component {
    PropTypes: {
        messages : PropTypes.array.required
    }

    render() {
        return <MessageList messages={ this.props.messages }
                            usersByID={ this.props.userMap } />;
    }
}


function mapStateToProps(state, ownProps){
    const channelID = ownProps.params.channel_id;

    const messages = state.messagesByChannel[channelID].messages;
    const isLoading = state.messagesByChannel[channelID].isFetching;
    
    const usersInMessages = new Set(messages.map(m => m.user));
    const userMap = {};
    usersInMessages.forEach(u => userMap[u] = state.users[u] );
    
    return {
        messages,
        userMap,
        isLoading
    }
}

function mapDispatchToProps(dispatch){
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);