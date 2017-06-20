import React, { Component } from 'react'
import Draggable from 'react-draggable'

class TextNote extends Component {
  constructor(props){
    super()
  }

  componentWillMount() {
    this.style = {
      border: '1px solid black',
      width: '200px',
      padding: '10px',
      position: 'absolute',
      backgroundColor: 'white',
      boxShadow: '5px 5px 15px 0 rgba(0, 0, 0, .2)'
    }
  }

  edit() {
    this.props.onTxtNoteToggle(this.props.id)
  }

  save() {
    this.props.onTxtNoteSave(this.refs.newText.value, this.props.id) //whenver note is updated(clicked on save) pass newText and id to parent update function to handle it for us. after update handles newText, it updates the notes array which gets rerenderd
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
      <div className="note" style={this.style}>
        <textarea ref="newText" defaultValue={this.props.note}>
        </textarea>
        <button onClick={() => this.save()}> Save </button>
      </div>
    )
  }

  displayMode() {
    return (
      <div className="textNote" style={this.style}>
        <p>{this.props.note}</p>
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
