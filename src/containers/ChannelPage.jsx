import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MessageList from '../components/MessageList';
import LoadingSpinner from '../components/LoadingSpinner';

class ChannelPage extends Component {
    static propTypes = {
        messages: PropTypes.array.required,
        isLoading: PropTypes.bool.required,
        userMap: PropTypes.object.required
    }

    render() {
        const { isLoading,
                messages,
                userMap } = this.props;

        if (isLoading) {
            return <LoadingSpinner />;
        }

        return (
            <MessageList
                messages={messages}
                usersByID={userMap} />
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

export default connect(mapStateToProps)(ChannelPage);
