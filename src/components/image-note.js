import React, { Component } from 'react'
import Draggable from 'react-draggable'

class ImageNote extends Component {
  constructor(){
    super()
  }

  edit() {
    this.props.onImgNoteToggle(this.props.id)
  }

  save() {
    this.props.onImgNoteSave(this.refs.src.value, this.props.id)
    this.props.onImgNoteToggle(this.props.id)
  }

  remove() {
    this.props.onImgNoteRemove(this.props.id)
  }

  drag(e, position) { //controlled drag
    this.props.onImgNoteDrag(e, position, this.props.id)
  }

  editMode() {// render editing form
    return(
      <div className="imageNote" >
        <input ref="src" defaultValue={this.props.src}/>
        <button onClick={() => this.save()}> Save </button>
      </div>
    )
  }

  displayMode() {// render note display
    return (
      <div className="imageNote" >
        <div >
          <strong className="cursor"><div className="drag-bar">Drag here</div></strong>
          <img src={this.props.src} height='150' width='150'/>
        </div>
        <span>
          <button onClick={() => this.edit()}>EDIT</button>
          <button onClick={() => this.remove()}>X</button>
        </span>
      </div>
    )
  }

  //check if we are editing or displaying and display the right render
  render() {
    return ( <Draggable handle='strong' bounds="parent" position={this.props.position} onDrag={(e, position) => this.drag(e, position)}>
              {(this.props.editing) ? this.editMode() : this.displayMode()}
            </Draggable>)
          }
}

export default ImageNote
