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
      const activeBoard = this.props.activeBoard
      console.log(activeBoard);
    }
  }


  eachNote(txtNote) {
    return (<TextNote
              key={txtNote.id}
              id={txtNote.id}
              editing={txtNote.editing}
              // toggleEditing={this.toggleEditing.bind(this)}
              // onRemove={this.onRemove.bind(this)}
              // onSave={this.onSave.bind(this)}
              note={txtNote.note}
            />)
  }

  eachImage(imageNote) {
    return (<ImageNote
              key={imageNote.id}
              id={imageNote.id}
              src={imageNote.src}
              // toggleEditing={this.toggleEditing.bind(this)}
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
