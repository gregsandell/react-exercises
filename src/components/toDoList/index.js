import cx from 'classnames'
import { Component } from 'react'
import PropTypes from 'prop-types'
import './toDoList.css'

class TodoItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      crossedOut: false
    }
  }

  handleItemClick (e) {
    e.preventDefault()
    this.props.doneRecorder(this.state.crossedOut ? -1 : 1)
    this.setState((prevState) => ({
      crossedOut: !prevState.crossedOut
    }))
  }

  render () {
    return (
      <li
        onClick={this.handleItemClick.bind(this)}
        className={cx({ 'is-done': this.state.crossedOut })}
      >{this.props.value}</li>
    )
  }
}
class TaskStatus extends Component {
  render () {
    return (
      <div>
        {this.props.totalCount - this.props.doneCount} remaining of {this.props.totalCount}
      </div>
    )
  }
}
export default class Index extends Component {
  constructor () {
    super()
    this.state = {
      newitem: '',
      doneCount: 0,
      itemlist: []
    }
  }

  handleNewitemChange (e) {
    e.preventDefault()
    this.setState({
      newitem: e.target.value
    })
  }

  doneRecorder (value) {
    this.setState((prevState) => ({
      doneCount: prevState.doneCount + value
    }))
  }

  handleNewitemAppend (e) {
    e.preventDefault()
    this.setState((prevState) => ({
      newitem: '',
      itemlist: [...prevState.itemlist,
        <TodoItem
          value={this.state.newitem}
          doneRecorder={this.doneRecorder.bind(this)}
          key={prevState.itemlist.length} />
      ]
    }))
  }

  render () {
    return (
      <>
        <div>
          <h2>
            Todo List
          </h2>
          <input type='text' value={this.state.newitem} onChange={this.handleNewitemChange.bind(this)} />
          <button onClick={this.handleNewitemAppend.bind(this)}>Add</button>
          <ul>
            {this.state.itemlist.map((item) => item)}
          </ul>
          <TaskStatus doneCount={this.state.doneCount} totalCount={this.state.itemlist.length} />
        </div>
      </>
    )
  }
}
TodoItem.propTypes = {
  value: PropTypes.string,
  doneRecorder: PropTypes.func
}
TaskStatus.propTypes = {
  doneCount: PropTypes.number,
  totalCount: PropTypes.number
}
