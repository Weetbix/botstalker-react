import React, { Component, PropTypes } from 'react';

import MessageListItem from './MessageListItem';

export default class extends Component {
    propTypes : {
        messages : PropTypes.array,
        usersByID : PropTypes.object
    }

    render(){
        return (
            <div className="ui segment">
                <div className="ui list">
                    { this.props.messages.map( msg => {
                        // Replace bot messages with a bot user
                        var user;
                        if( msg.subtype === 'bot_message' ){
                            user = {
                                name : msg.username,
                                profile : { image_24: 'http://emojipedia-us.s3.amazonaws.com/cache/53/df/53df16cb58da670f404ba13a6ec3a63d.png' }
                            }
                        } else {
                            user = this.props.usersByID[msg.user];
                        }

                        return <MessageListItem username={ user.name }
                                                text={ msg.text }
                                                avatar={ user.profile.image_24 } />;
                    })}
                </div>
            </div>
        );
    }
}
