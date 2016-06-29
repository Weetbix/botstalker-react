import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ChannelList extends Component {
    propTypes : {
        channels : propTypes.array.required,
        isLoading : propTypes.bool.required
    }

    render() {
        return (
            <div>
            { this.props.channels.map( 
                channel => <div>{channel.id}</div>
            )}
            </div>
        );
    }
}

function mapStateToProps(state){
  return {
      channels : state.channelsByBot[state.currentBot].channels,
      isLoading : state.channelsByBot[state.currentBot].isLoading
  };
}

function mapDispatchToProps(dispatch){
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)