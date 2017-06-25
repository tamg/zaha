import React, { Component } from 'react'
import Draggable from 'react-draggable'
// import { ColorPicker } from 'react-color'
import ColorPicker from './color-picker'


class TextNote extends Component {
  constructor(props){
    super(props)
  }

  componentDidUpdate() {
    if (this.props.editing) {
        this.refs.newText.focus()
        this.refs.newText.select()
    }
  }

  _handleKeyPress(e) {
    e.key === 'Enter' ? this.save() : null
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

  changeColor(color) {
  this.props.onColorChange(color.hex, this.props.id)
  }

  editMode() {
    const colors = ['#DB3E00', '#FCCB00', '#008B02', '#1273DE', '#5300EB']
    const style = { borderTop: `7px solid ${this.props.color}`} //highlight color at the top of note
    return(
      <div className="textNoteEditContainer">
        <div style={style} className="textNoteEdit">
          <textarea ref="newText" defaultValue={this.props.note} onKeyPress={this._handleKeyPress.bind(this)}></textarea>
          <button onClick={() => this.save()}> Save </button>
        </div>
        <div className="colorPicker">
          <ColorPicker width='85px' colors={colors} triangle='hide' onChangeComplete={ (color) => this.changeColor(color)}/>
        </div>
      </div>
    )
  }

  displayMode() {
    const style = { borderTop: `7px solid ${this.props.color}`} //highlight color at the top of note
    return (
      <div style={style} className="textNoteDisplay" >
        <p onDoubleClick={() => this.edit()} title="Double click to edit">{this.props.note}</p>
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
