import React, { Component, PropTypes } from 'react';


export default class extends Component {
    static propTypes = {
        user: PropTypes.object.required,
        channel: PropTypes.object.required,
        apiKey: PropTypes.string.required
    }

    render() {
        let messageCount = this.props.channel.messageCount || 0;
        const imageProps = {
            className: messageCount <= 0 ? 'image grayscale' : 'image',
            href: messageCount <= 0 ? null : `#${this.props.apiKey}/${this.props.channel.id}`
        };
        messageCount = messageCount >= 10 ? '10+' : messageCount;

        return (
            <div className="card">
                <a { ...imageProps }>
                    <img src={this.props.user.profile.image_192} />
                </a>
                <div className="content">
                    <div className="header">{this.props.user.name}</div>
                    <div className="meta">
                        <span>
                            <i className="mail icon"></i>
                            {messageCount}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
