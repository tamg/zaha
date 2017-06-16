import React, { Component } from 'react'
import MenuBar from './menu-bar'
import TextNote from './text-note'
import ImageNote from './image-note'
import SketchNote from './sketch-note'

class Board extends Component {
  constructor(props) {
    super(props)

    if(!this.props.activeBoard){
      return <div>loading</div>
    } else {
      console.log('active is ', this.props.activeBoard);
      const activeBoard = this.props.activeBoard
    }
  }

  eachNote(txtNote) {
    return (<TextNote
              key={txtNote.id}
              id={txtNote.id}
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
        <div className="board">
           {this.props.activeBoard.txtNotes.map(this.eachNote, this)}
           {/* {this.props.activeBoard.imageNotes.map(this.eachImage, this)} */}
           {/* {this.props.activeBoard.sketchNotes.map(this.eachSketch, this)} */}
       </div>
      </div>
    )
  }
}

export default Board
