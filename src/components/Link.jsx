import React, { Component, PropTypes } from 'react';

export default class extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired
    };

    render(){
        return (
            <a href="#"
               onClick={ e => {
                   e.preventDefault();
                   this.props.onClick();
               }}>
                {this.props.children}
            </a>
        );
    }
}
