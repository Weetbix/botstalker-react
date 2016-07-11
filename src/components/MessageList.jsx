import React, { Component, PropTypes } from 'react';

import MessageListItem from './MessageListItem';

export default class extends Component {
    static propTypes = {
        messages: PropTypes.array,
        usersByID: PropTypes.object,
        hasMore: PropTypes.bool,
        isLimited: PropTypes.bool
    }

    renderMessages() {
        return this.props.messages.map(msg => {
            // Replace bot messages with a bot user
            let user;
            if (msg.subtype === 'bot_message') {
                user = {
                    name: msg.username,
                    profile: { image_24: 'http://emojipedia-us.s3.amazonaws.com/cache/53/df/53df16cb58da670f404ba13a6ec3a63d.png' }
                };
            } else {
                user = this.props.usersByID[msg.user];
            }

            return (
                <MessageListItem key={msg.ts}
                    username={user.name}
                    text={msg.text}
                    avatar={user.profile.image_24}
                />
            );
        });
    }

    renderMessageInfos() {
        if (this.props.isLimited) {
            return (
                <div className="ui top attached info message center aligned">
                    <i className="info icon"></i>
                    <span>There are more messages to display but your Slack channel history is limited</span>
                </div>
            );
        } else if (this.props.hasMore) {
            return (
                <div className="ui top attached center aligned segment">
                    <span>Load previous messages</span>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.renderMessageInfos()}
                <div className="ui bottom attached segment">
                    <div className="ui list">
                        {this.renderMessages()}
                    </div>
                </div>
            </div>
        );
    }
}
