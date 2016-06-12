import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

class App extends Component {
  render() {
    return (
    <div>
        <div className="site-content">
            <Header />
            <SearchBar />
            { this.props.children }
            <div className="ui container very basic segment">
                <div id="pagecontrols-region"></div>

                <div id="loading-region"></div>
                <div id="content-region"></div>
            </div>
        </div>
        
        <div id="footer" className="ui center aligned very basic segment">
        <span>By John Hannagan - </span><a className="item" href="http://github.com/weetbix/botstalker">Github</a>
        </div>
    </div>
    );
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



export default App;//connect(mapStateToProps)(App)