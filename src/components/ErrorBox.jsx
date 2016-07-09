import React, { Component, PropTypes } from 'react'

export default class extends Component {
    propTypes: {
        header : PropTypes.string.required,
        message : PropTypes.string.required,
        onDismiss : PropTypes.func.required
    }

    componentDidMount(){
        if( this.isMounted() ){
            
        }
        this.refs.close.addEventListener(
            'click',
            this.props.onDismiss
        );
    }
    render() {
        return (
            <div className="ui negative message">
                <i className="close icon" ref='close'></i>
                <div className="header">{ this.props.header }</div>
                <p>{ this.props.message }</p>
            </div>
           // <div class="ui center aligned container">
           //     <h1 class="big-message">{ this.props.message }</h1>
           // </div>
        );
    }
}