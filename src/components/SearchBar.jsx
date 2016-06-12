import React, { Component } from 'react'; 

export default class extends Component {

    render() {
        return (
            <div className="ui container very basic segment">
                <div id="search-region">
                    <form className="ui form">
                        <div className="ui fluid icon input">
                            <input type="text" id="search-term" placeholder="Enter your bot API key" />
                            <i className="search icon"></i>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}