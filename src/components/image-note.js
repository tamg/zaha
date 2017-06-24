import React, { Component } from 'react'
import Draggable from 'react-draggable'

class ImageNote extends Component {
  constructor(){
    super()
  }

  componentDidMount() {
    if (this.props.editing) {
        this.refs.src.focus()
        this.refs.src.select()
    }
  }

  componentDidUpdate() {
    if (this.props.editing) {
        this.refs.src.focus()
        this.refs.src.select()
    }
  }

  _handleKeyPress(e) {
    e.key === 'Enter' ? this.save() : null
  }

  edit() {
    this.props.onImgNoteToggle(this.props.id)
  }

  getImage(url){
    return new Promise(function(resolve, reject){
        var img = new Image()
        img.onload = function(){ resolve(this) }
        img.onerror = function(){ reject(url) }
        img.src = url
    })
  }

  save() {
    var self = this
    this.getImage(this.refs.src.value)
        .then(function(img){
          var imgHeight = 150
          var imgWidth = ( img.width / img.height ) * 150
          self.props.onImgNoteSave(self.refs.src.value, self.props.id, imgWidth, imgHeight)
          self.props.onImgNoteToggle(self.props.id)
        })
  }

  remove() {
    this.props.onImgNoteRemove(this.props.id)
  }

  drag(e, position) { //controlled drag
    this.props.onImgNoteDrag(e, position, this.props.id)
  }

  editMode() {// render editing form
    return(
      <div className="imageNoteEdit" >
        <strong className="cursor">
          <p className="url">Image url</p>
          <input ref="src" defaultValue={this.props.src} onKeyPress={this._handleKeyPress.bind(this)}/>
          <button onClick={() => this.save()}> Save </button>
          <button onClick={() => this.remove()}>X</button>
        </strong>
      </div>
    )
  }

  displayMode() {
    var { src, imgHeight, imgWidth } = this.props
    return (
      <div className="imageNoteDisplay" >
          <strong className="cursor">
            <div className="drag-bar">
              <img className="nonDraggableImage" src={this.props.src} height={imgHeight} width={imgWidth} />
            </div>
          </strong>

        <span className="image-edit">
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
