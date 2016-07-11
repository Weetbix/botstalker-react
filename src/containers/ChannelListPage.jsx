import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ChannelListItem from '../components/ChannelListItem';
import LoadingSpinner from '../components/LoadingSpinner';

class ChannelListPage extends Component {
    static propTypes = {
        channels: PropTypes.array.required,
        users: PropTypes.array.required,
        apiKey: PropTypes.string.required,
        isLoading: PropTypes.bool.required
    }

    render() {
        const { users,
                channels,
                isLoading,
                apiKey } = this.props;

        // If the channel data is loading, show a spinner
        if (isLoading) {
            return <LoadingSpinner />;
        }

        // Otherwise show the loaded channels as they load
        const loadedChannels = channels.filter(
            channel => users[channel.user] &&
                       !users[channel.user].isFetching
        );

        return (
            <div className="ui four link cards">
            {loadedChannels.map(
                channel => <ChannelListItem key={channel.id}
                    channel={channel}
                    user={users[channel.user]}
                    apiKey={apiKey} />
            )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const botChannels = state.channelsByBot[state.currentBot];

    if (botChannels) {
        const { isFetching, channels } = botChannels;

        if (isFetching)
            return { isLoading: true };

        const users = {};
        channels.forEach(channel => {
            users[channel.user] = state.users[channel.user];
        });

        return {
            channels,
            users,
            isLoading: false,
            apiKey: state.currentBot
        };
    }

    // Defaults when the channel is not found
    return {
        channels: [],
        isLoading: false,
        users: [],
        apiKey: state.currentBot
    };

}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelListPage)
;
