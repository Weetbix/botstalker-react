import React, { Component, PropTypes } from 'react';

import Link from './Link';
import MessageListItem from './MessageListItem';
import LoadingSpinner from './LoadingSpinner';

export default class extends Component {
    static propTypes = {
        messages: PropTypes.array,
        usersByID: PropTypes.object,
        isLoadingMore: PropTypes.bool,
        isLoadingUsers: PropTypes.bool,
        hasMore: PropTypes.bool,
        isLimited: PropTypes.bool,
        fetchMessages: PropTypes.func.required
    }

    constructor(props){
        super(props);
    }

    renderMessages() {
        if (this.props.messages.length === 0 &&
            !this.props.isLoadingMore) {
            return <span>There are no messages in this channel</span>;
        }

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
                    avatar={user.profile.image_24} />
            );
        });
    }

    // Show info boxes at the top when there
    // are more messages to be fetch or if there
    // are hidden messages because the channel is limited
    renderMessageInfos() {
        if (this.props.isLoadingMore ||
            this.props.isLoadingUsers) {
            return (
                <div className="ui top attached center aligned segment">
                    <div className="ui active inverted dimmer">
                        <div className="ui small text loader"></div>
                    </div>
                    <span>Load previous messages</span>
                </div>
            );
        } else if (this.props.isLimited) {
            return (
                <div className="ui top attached info message center aligned">
                    <i className="info icon"></i>
                    <span>There are more messages to display but your Slack channel history is limited</span>
                </div>
            );
        } else if (this.props.hasMore) {
            return (
                <div className="ui top attached center aligned segment">
                    <span>
                        <Link onClick={ () => {
                            this.props.fetchMessages(
                                this.props.messages[0].ts
                            );
                        }}>
                            Load previous messages
                        </Link>
                    </span>
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
