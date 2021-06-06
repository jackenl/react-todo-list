import React, { Component } from 'react'

class ListItem extends Component {
  constructor(props) {
    super(props)

    this.handleChangeStatus = this.handleChangeStatus.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  render() {
    return (
      <li className="list-item">
        <div
          className={this.props.item.status ? 'left-grid done-color' : 'left-grid todo-color'}
        ></div>
        <input
          className="checkbox"
          type="checkbox"
          defaultChecked={this.props.item.status}
          onChange={this.handleChangeStatus}
        />
        <div className={this.props.item.status === 0 ? 'task-text todo' : 'task-text done'}>
          {this.props.item.text}
        </div>
        <i className="iconfont icon-delete" onClick={this.handleDelete}>
          &#xe6b7;
        </i>
      </li>
    )
  }

  handleChangeStatus() {
    this.props.changeItemStatus(this.props.index, this.props.item.status)
  }

  handleDelete() {
    this.props.deleteItem(this.props.index, this.props.item.status)
  }
}

export default ListItem
