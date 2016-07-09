import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ErrorBox from '../components/ErrorBox';

import { selectBot } from '../actions/selectBot';
import { clearError } from '../actions/error';

class App extends Component {

  propTypes: {
    onSearchForBot : propTypes.func.required,
    error : propTypes.object,
    onClearError : propTypes.func
  }

  renderError(){
    if(!this.props.error){
      return null;
    }

    const { header, message } = this.props.error;
    return <ErrorBox header={ header }
                     message={ message }
                     onDismiss={ this.props.onClearError }/>
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
                { this.renderError() }
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
    currentBot : state.currentBot,
    error : state.error
  };
}

function mapDispatchToProps(dispatch){
  return {
    onSearchForBot: apiKey => dispatch(push(`/${apiKey}`)),
    onClearError : () => dispatch(clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)