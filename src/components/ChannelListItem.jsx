import React, { Component, PropTypes } from 'react';


export default class extends Component {
    static propTypes = {
        user: PropTypes.object.required,
        channel: PropTypes.object.required,
        apiKey: PropTypes.string.required
    }

    render() {
        return (
            <div className="card">
                <a className="image" href={`#${this.props.apiKey}/${this.props.channel.id}`}>
                    <img src={this.props.user.profile.image_192} />
                </a>
                <div className="content">
                    <div className="header">{this.props.user.name}</div>
                    <div className="meta">
                    <span>
                        <i className="mail icon"></i>
                        5
                    </span>
                    </div>
                </div>
            </div>
        );
    }
}
