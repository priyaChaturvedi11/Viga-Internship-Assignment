import React, { Component } from 'react';

class Header extends Component {
  render() {
    const name = this.props.name;

    return (
      <div className="header">
        <h3>{ name }</h3>
      </div>
    );
  }
}


export default Header;