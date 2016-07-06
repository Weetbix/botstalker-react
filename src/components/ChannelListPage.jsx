import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ChannelListItem from './ChannelListItem';

class ChannelListPage extends Component {
    propTypes : {
        channels : propTypes.array.required,
        isLoading : propTypes.bool.required
    }

    render() {
        if( this.props.isLoading ) return <h1>Loading</h1>;

        const loadedChannels = this.props.channels.filter(
            channel => {
                const channelUser = this.props.users[channel.user];
                return channelUser && !channelUser.isFetching;
            }
        );

        return (
            <div className='ui four link cards'>
            { loadedChannels.map( 
                channel => <ChannelListItem key={ channel.id }
                                            channel={ channel } 
                                            user={ this.props.users[ channel.user ] }
                                            apiKey={ this.props.apiKey }/>
            )}
            </div>
        );
    }
}

function mapStateToProps(state){

    const isLoading = state.channelsByBot[state.currentBot].isFetching;
    
    if( isLoading )
        return { isLoading };

    const channels = state.channelsByBot[state.currentBot].channels;
    const users = {};
    channels.forEach(channel => users[channel.user] = state.users[channel.user]);
 
    return {
        channels,
        users,
        isLoading,        
        apiKey : state.currentBot
    };
}

function mapDispatchToProps(dispatch){
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelListPage)