import React, { Component } from 'react'

class BoardTitle extends Component {
  constructor(props){
    super(props)

    this.state = { editing: false }
  }

  componentDidUpdate() {
    if (this.state.editing) {
        this.refs.newTitle.focus()
        this.refs.newTitle.select()
    }
  }

  _handleKeyPress(e) {
    e.key === 'Enter' ? this.save() : null
  }

  edit() {
    this.setState({editing: true})
  }

  save() {
    this.props.onTitleChange(this.refs.newTitle.value, this.props.activeBoard.id)
    this.setState({editing: false})
  }

  editMode() {
    return(
      <div className="boardTitleEdit">
        <input ref="newTitle" defaultValue={this.props.activeBoard.title}
                              onKeyPress={this._handleKeyPress.bind(this)}
                              onBlur={this.save.bind(this)}/>
      </div>
    )
  }

  displayMode() {
    return (
      <div className="boardTitleDisplay" onClick={() => this.edit()}>
        <p title="Click to edit"> {this.props.activeBoard.title}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="boardTitle">
        {
          !this.props.activeBoard ? <div className="noBoard">Add a board to start...</div> :
          this.state.editing ? this.editMode() : this.displayMode()
        }
      </div>
    )
  }
}

export default BoardTitle
