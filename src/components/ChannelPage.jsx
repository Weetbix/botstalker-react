import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ChannelPage extends Component {
    PropTypes: {
        messages : PropTypes.array.required
    }

    render() {
        return (
            <div>
            { this.props.messages.map( msg => <div>{ msg.text }</div>) }
            </div>
        );
    }
}


function mapStateToProps(state, ownProps){
    const channelID = ownProps.params.channel_id;
    
    return {
        messages : state.messagesByChannel[channelID].messages,
        isLoading : state.messagesByChannel[channelID].isFetching
    }
}

function mapDispatchToProps(dispatch){
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);