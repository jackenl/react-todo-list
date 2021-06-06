import React, { Component } from 'react'
import Title from './Title'
import ListItem from './ListItem'

class List extends Component {
  render() {
    const count = this.getCount()
    if (count > 0) {
      return (
        <ul className="task-list">
          <Title title={this.props.title} status={this.props.status} count={count}></Title>
          {this.showItems()}
        </ul>
      )
    } else {
      return (
        <div className="task-list">
          <Title title={this.props.title} count={count}></Title>
          <div style={{ textAlign: 'center' }}>暂时没有任务...</div>
        </div>
      )
    }
  }

  getCount() {
    let count = 0
    if (Object.keys(this.props).indexOf('status') !== -1) {
      this.props.content.forEach(item => {
        if (item.status === this.props.status)
          count++
      })
    } else {
      const regx = new RegExp(this.props.searchValue)
      this.props.content.forEach(item => {
        if (regx.test(item.text)) count++
      })
    }
    return count
  }

  showItems() {
    return this.props.content.map((item, index) => {
      if (Object.keys(this.props).indexOf('status') !== -1) {
        if (item.status === this.props.status) {
          return (
            <ListItem
              key={index}
              index={index}
              item={item}
              changeItemStatus={this.props.changeItemStatus}
              deleteItem={this.props.deleteItem}
            ></ListItem>
          )
        }
      } else {
        let regx = new RegExp(this.props.searchValue)
        if (regx.test(item.text)) {
          return (
            <ListItem
              key={index}
              index={index}
              item={item}
              changeItemStatus={this.props.changeItemStatus}
              deleteItem={this.props.deleteItem}
            ></ListItem>
          )
        }
      }
      return null
    }) 
  }
}

export default List
