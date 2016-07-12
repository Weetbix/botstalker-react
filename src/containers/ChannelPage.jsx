import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchMessages } from '../actions/messages';
import MessageList from '../components/MessageList';
import LoadingSpinner from '../components/LoadingSpinner';

class ChannelPage extends Component {
    static propTypes = {
        messages: PropTypes.array.required,
        isLoadingFirst: PropTypes.bool.required,
        isLoadingMore: PropTypes.bool.required,
        isLoadingUsers: PropTypes.bool.required,
        userMap: PropTypes.object.required,
        hasMore: PropTypes.bool.required,
        isLimited: PropTypes.bool.required
    }

    render() {
        const { isLoadingMore,
                isLoadingFirst,
                isLoadingUsers,
                messages,
                userMap,
                hasMore,
                isLimited,
                fetchMessages } = this.props;

        // Dont show any messages if we are loading the first
        // batch, or users from the first batch
        if (isLoadingFirst ||
            (!isLoadingMore && isLoadingUsers)) {
            return <LoadingSpinner />;
        }

        return (
            <MessageList
                messages={messages}
                usersByID={userMap}
                hasMore={hasMore}
                isLimited={isLimited}
                fetchMessages={fetchMessages}
                isLoadingMore={isLoadingMore}
                isLoadingUsers={isLoadingUsers} />
        );
    }
}


function mapStateToProps(state, ownProps) {
    const channelID = ownProps.params.channel_id;

    const {
        messagesByChannel,
        users
    } = state;

    const messageList = messagesByChannel[channelID];
    const messages = messageList.messages;

    const usersInMessages = new Set(messages.map(m => m.user)
                                            .filter(u => typeof u !== 'undefined'));
    const userMap = {};
    usersInMessages.forEach(u => userMap[u] = users[u]);


    // We are loading the first messages if the channel is loading
    // and there are no current messages
    const isLoadingFirst = messageList.isFetching &&
                           (!messageList.messages ||
                            messageList.messages.length === 0);

    // We are loading additional messages if we are
    // fetching, and there are already messages existing
    const isLoadingMore = !isLoadingFirst &&
                          messageList.isFetching;


    const isLoadingUsers = Object.keys(userMap)
                                 .map(u => userMap[u].isFetching)
                                 .some(fetching => fetching === true);

    return {
        messages,
        userMap,
        isLoadingFirst,
        isLoadingMore,
        isLoadingUsers,
        hasMore: messagesByChannel[channelID].hasMore,
        isLimited: messagesByChannel[channelID].isLimited
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        fetchMessages: latest => {
            return dispatch(fetchMessages(
                ownProps.params.api_key,
                ownProps.params.channel_id,
                10,
                latest));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
