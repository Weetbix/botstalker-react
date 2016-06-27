import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

import { selectBot } from '../actions/actions';

class App extends Component {

  propTypes: {
    onSearchForBot : propTypes.func.required
  }

  render() {
    return (
    <div>
        <div className="site-content">
            <Header />
            <SearchBar onSearch={ this.props.onSearchForBot } />
            <div className="ui container very basic segment">
                <div id="pagecontrols-region"></div>
                <div id="loading-region"></div>

                <div id="content-region">
                  { this.props.children }
                </div>
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
  return {};
}

function mapDispatchToProps(dispatch){
  return {
    onSearchForBot: api_key => dispatch(push(`/${api_key}`))
  }
}
/*
App.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}
*/



export default connect(mapStateToProps, mapDispatchToProps)(App)