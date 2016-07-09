import React, { Component, PropTypes } from 'react';

export default class extends Component {
    static propTypes = {
        header: PropTypes.string.required,
        message: PropTypes.string.required,
        onDismiss: PropTypes.func.required
    }

    componentDidMount() {
        this.refs.close.addEventListener(
            'click',
            this.props.onDismiss
        );
    }
    render() {
        return (
            <div className="ui negative message">
                <i className="close icon" ref="close"></i>
                <div className="header">{this.props.header}</div>
                <p>{this.props.message}</p>
            </div>
        );
    }
}
