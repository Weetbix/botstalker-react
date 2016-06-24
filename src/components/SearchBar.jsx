import React, { Component } from 'react'; 

export default class extends Component {

    propTypes: {
        onSearch: propTypes.func.required
    }

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onSearch( event.target.value );
    }

    render() {
        return (
            <div className="ui container very basic segment">
                <div id="search-region">
                    <form className="ui form" onSubmit={ this.handleSubmit }>
                    { /* update state using input here */ }
                        <div className="ui fluid icon input">
                            <input type="text"
                                   id="search-term"
                                   placeholder="Enter your bot API key" />
                            <i className="search icon"></i>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}