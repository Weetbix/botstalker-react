import React, { Component, PropTypes } from 'react';

export default class extends Component {

    static propTypes = {
        onSearch: PropTypes.func.required,
        value: PropTypes.string
    }

    constructor(props) {
        super();
        this.state = {
            value: props.value || ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            value: nextProps.value || ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSearch(this.state.value);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div className="ui container very basic segment">
                <div id="search-region">
                    <form className="ui form" onSubmit={this.handleSubmit}>
                        <div className="ui fluid icon input">
                            <input type="text"
                                id="search-term"
                                placeholder="Enter your bot API key"
                                value={this.state.value}
                                onChange={this.handleChange} />
                            <i className="search icon"></i>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
