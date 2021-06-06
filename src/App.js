import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'
import localStorage from 'localStorage'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      inputValue: '',
      searchValue: '',
      isHome: true,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEnterAddItem = this.handleEnterAddItem.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
    this.handleChangeItemStatus = this.handleChangeItemStatus.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleGetItems = this.handleGetItems.bind(this)
  }

  render() {
    return (
      <div className="App">
        <Header changSearchValue={this.handleSearchChange} getItems={this.handleGetItems}></Header>
        {this.showItems()}
        <Footer></Footer>
      </div>
    )
  }

  componentDidMount() {
    const list = JSON.parse(localStorage.getItem('list'))
    this.setState(() => ({
      list: Array.isArray(list) ? list : []
    }))
  }

  componentDidUpdate() {
    localStorage.setItem('list', JSON.stringify(this.state.list))
  }

  showItems() {
    if (this.state.isHome) {
      return (
        <section className="home-page">
          <div className="container">
            <div className="add-input-wrapper">
              <input
                className="add-input"
                type="text"
                onChange={this.handleInputChange}
                onKeyUp={this.handleEnterAddItem}
                value={this.state.inputValue}
                placeholder="添加ToDo"
              />
              <button className="add-btn" onClick={this.handleAddItem}>添加</button>
            </div>
            {this.getItems('正在进行', 0)}
            {this.getItems('已经完成', 1)}
          </div>
        </section>
      )
    } else {
      return (
        <section className="search-page">
          {this.getSearchItems()}
        </section>
      )
    }
  }

  getItems(title, status) {
    return (
      <List
        title={title}
        content={this.state.list}
        status={status}
        changeItemStatus={this.handleChangeItemStatus}
        deleteItem={this.handleDeleteItem}
      ></List>
    )
  }

  getSearchItems() {
    return (
      <List
        title={'搜索结果'}
        content={this.state.list}
        searchValue={this.state.searchValue}
        changeItemStatus={this.handleChangeItemStatus}
        deleteItem={this.handleDeleteItem}
      ></List>
    )
  }

  handleInputChange(e) {
    const value = e.target.value
    this.setState(() => ({
      inputValue: value
    }))
  }

  handleAddItem() {
    if (this.state.inputValue === '') {
      alert('请输入内容')
      return null
    }
    this.setState(state => {
      const obj = {
        text: state.inputValue,
        status: 0
      }
      return {
        list: [...state.list, obj],
        inputValue: ''
      }
    })
  }

  handleEnterAddItem(e) {
    if (e.key === 'Enter') {
      this.handleAddItem()
    }
  }

  handleGetItems() {
    this.setState(() => ({
      isHome: false
    }))
  }

  handleDeleteItem(index) {
    this.setState(state => ({
      list: state.list.filter((item, i) => {
        return index !== i
      })
    }))
  }

  handleChangeItemStatus(index) {
    this.setState(state => {
      const newList = state.list.map((item, i) => {
        if (index === i) {
          item.status = item.status === 0 ? 1 : 0
        }
        return item
      })
      return {
        list: newList
      }
    })
  }

  handleSearchChange(value) {
    this.setState(() => ({
      searchValue: value
    }))
  }
}

export default App
