import React, { Component, PropTypes } from 'react';

import MessageListItem from './MessageListItem';

export default class extends Component {
    propTypes : {
        messages : PropTypes.array,
        usersByID : PropTypes.object
    }

    render(){
        console.log( 'message count: ' + this.props.messages.length );
        return (
            <div className="ui segment">
                <div className="ui list">
                    { this.props.messages.map( msg => {
                        const user = this.props.usersByID[msg.user];
                        return <MessageListItem username={ user.name }
                                                text={ msg.text }
                                                avatar={ user.profile.image_24 } />;
                    })}
                </div>
            </div>
        );
    }
}
