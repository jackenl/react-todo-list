import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="page-nav">
          <a href="./" className="page-title">ToDo List</a>
          <input className="search-input" type="text" placeholder="请输入搜索ToDo" onChange={this.handleValueChange} onKeyUp={this.KeyUpForEnter}/>
        </nav>
      </header>
    )
  }

  KeyUpForEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.getItems()
    }
  }

  handleValueChange = (e) => {
    const value = e.target.value
    this.props.changSearchValue(value)
  }
}

export default Header