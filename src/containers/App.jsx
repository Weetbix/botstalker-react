import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

import { selectBot } from '../actions/selectBot';

class App extends Component {

  propTypes: {
    onSearchForBot : propTypes.func.required
  }

  render() {
    return (
    <div>
        <div className="site-content">
            <Header />
            <SearchBar onSearch={ this.props.onSearchForBot }
                       value={ this.props.currentBot } />
            <div className="ui container very basic segment">
                <div id="pagecontrols-region"></div>
                <div id="loading-region"></div>

                { this.props.children }
            </div>
        </div>
        
        <div id="footer" className="ui center aligned very basic segment">
        <span>By John Hannagan - </span><a className="item" href="http://github.com/weetbix/botstalker">Github</a>
        </div>
    </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentBot : state.currentBot
  };
}

function mapDispatchToProps(dispatch){
  return {
    onSearchForBot: api_key => dispatch(push(`/${api_key}`))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)