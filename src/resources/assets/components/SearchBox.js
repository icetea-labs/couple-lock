import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <div className="search_box">
          <span className="icon-search"></span>
          <input type="text" name="" placeholder="Search" />
      </div>
    );
  }
}

export default SearchBox;