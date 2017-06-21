import React, { Component } from 'react'

class BoardList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}

    if(!this.props.boards){
      return
    }

    this.handleChange = this.handleChange.bind(this)
  }

  eachBoard(board) {
    return(
      <option key={board.id}
              value={board.id}>
              {board.title}
      </option>
    )
  }

  handleChange(event) {
    this.props.changeBoard(parseInt(event.target.value))
  }

  render() {
    return(
      <form >
          <label> Current Board:
          <select  onChange={this.handleChange}>
            {this.props.boards.map(this.eachBoard, this)}
          </select>
        </label>
      </form>
    )
  }
}

export default BoardList
