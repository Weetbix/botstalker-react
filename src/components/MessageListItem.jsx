import React, { Component, PropTypes } from 'react';

export default class extends Component {
    propTypes : {
        username : PropTypes.string.required,
        text : PropTypes.string.required,
        avatar : PropTypes.string.required
    }

    render(){
        return (
            <div className="item">
                <img className="ui avatar image" src={ this.props.avatar } />
                <div className="content">
                    <div className="header">{ this.props.username }</div>
                    { this.props.text }
                </div>
            </div>
        );
    }
}
