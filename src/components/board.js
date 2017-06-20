import React, { Component } from 'react'
import MenuBar from './menu-bar'
import TextNote from './text-note'
import ImageNote from './image-note'
import SketchNote from './sketch-note'

class Board extends Component {
  constructor(props) {
    super(props)

  }

  componentWillMount() { //set a random mounting position of note right before rendering
    this.style = {
      border: '1px solid black',
      width: '200px',
      padding: '10px',
      position: 'absolute',
      // right: this.props.position.x + 'px',
      // top: this.props.position.y + 'px',
      backgroundColor: 'white',
      boxShadow: '5px 5px 15px 0 rgba(0, 0, 0, .2)'
    }
  }

  eachNote(txtNote) {
    return (<TextNote
              key={txtNote.id}
              id={txtNote.id}
              position={txtNote.position}
              onNoteDrag={this.props.onNoteDrag}
              editing={txtNote.editing}
              onToggle={this.props.onToggle}
              onRemove={this.props.onRemove}
              onSave={this.props.onSave}
              note={txtNote.note}
            />)
  }

  eachImage(imageNote) {
    return (<ImageNote
              key={imageNote.id}
              id={imageNote.id}
              src={imageNote.src}
              // onToggle={this.onToggle.bind(this)}
              // onRemove={this.onRemove.bind(this)}
              // onSave={this.onSave.bind(this)}
            />)
  }

  eachSketch(sketchNote){
    return (<SketchNote
      key={sketchNote.id}
      id={sketchNote.id}
      />)
  }

  render() {
    return (
      <div>
        {
          !this.props.activeBoard ? <div>Create a new board to start...</div> :

          <div className="board" style={{height: '100vh', width: '100%', position: 'relative', padding: '10px'}}>
             {this.props.activeBoard.txtNotes.map(this.eachNote, this)}
             {/* {this.props.activeBoard.imageNotes.map(this.eachImage, this)} */}
             {/* {this.props.activeBoard.sketchNotes.map(this.eachSketch, this)} */}
          </div>
        }
      </div>
    )
  }
}

export default Board
