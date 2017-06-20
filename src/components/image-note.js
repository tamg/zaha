import React, { Component } from 'react'
import Draggable from 'react-draggable'

class ImageNote extends Component {
  constructor(){
    super()
  }

  componentWillMount() {
		this.style = {
			border: '1px solid black',
			padding: '10px',
			position: 'absolute',
			backgroundColor: 'white',
			boxShadow: '5px 5px 15px 0 rgba(0, 0, 0, .2)'
		}
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
      <div className="imageNote" style={this.style}>
        <input ref="src" defaultValue={this.props.note}/>
        <button onClick={() => this.save()}> Save </button>
      </div>
    )
  }

  displayMode() {// render note display
    return (
      <div className="imageNote" style={this.style}>
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
