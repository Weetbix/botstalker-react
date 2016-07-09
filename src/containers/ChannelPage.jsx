import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MessageList from '../components/MessageList';

class ChannelPage extends Component {
    static propTypes = {
        messages: PropTypes.array.required,
        isLoading: PropTypes.boolean.required,
        userMap: PropTypes.object.required
    }

    render() {
        if (this.props.isLoading) {
            return <h3>Loading</h3>;
        }

        return (
            <MessageList
                messages={this.props.messages}
                usersByID={this.props.userMap} />
        );
    }
}


function mapStateToProps(state, ownProps) {
    const channelID = ownProps.params.channel_id;

    const messages = state.messagesByChannel[channelID].messages;


    const usersInMessages = new Set(messages.map(m => m.user)
                                            .filter(u => typeof u !== 'undefined'));
    const userMap = {};
    usersInMessages.forEach(u => userMap[u] = state.users[u]);
    const isLoadingUsers = Object.keys(userMap).map(u => userMap[u].isFetching);
    const isLoading = state.messagesByChannel[channelID].isFetching ||
                      isLoadingUsers.some(loading => loading === true);

    return {
        messages,
        userMap,
        isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
