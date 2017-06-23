import React, { Component } from 'react'
import Draggable from 'react-draggable'

class TextNote extends Component {
  constructor(props){
    super()
  }

  componentDidUpdate() {
    if (this.props.editing) {
        this.refs.newText.focus()
        this.refs.newText.select()
    }
  }

  edit() {
    this.props.onTxtNoteToggle(this.props.id)
  }

  save() {
    this.props.onTxtNoteSave(this.refs.newText.value, this.props.id)
    this.props.onTxtNoteToggle(this.props.id)
  }

  remove() {
    this.props.onTxtNoteRemove(this.props.id)
  }

  drag(e, position) {
    this.props.onTxtNoteDrag(e, position, this.props.id)
  }

  editMode() {
    return(
      <div className="textNote" >
        <textarea ref="newText" defaultValue={this.props.note}>
        </textarea>
        <button onClick={() => this.save()}> Save </button>
      </div>
    )
  }

  displayMode() {
    return (
      <div className="textNote" >
        <p onDoubleClick={() => this.edit()}>{this.props.note}</p>
        <span>
          <button onClick={() => this.edit()}>EDIT</button>
          <button onClick={() => this.remove()}>X</button>
        </span>
      </div>
    )
  }

  render() {
    return ( <Draggable bounds="parent" position={this.props.position} onDrag={(e, position) => this.drag(e, position)}>
              {(this.props.editing) ? this.editMode() : this.displayMode()}
            </Draggable>)
          }
  }

export default TextNote
