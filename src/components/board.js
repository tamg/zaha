import React, { Component } from 'react'
import MenuBar from './menu-bar'
import TextNote from './text-note'
import ImageNote from './image-note'

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
              editing={txtNote.editing}
              onTxtNoteDrag={this.props.onTxtNoteDrag}
              onTxtNoteToggle={this.props.onTxtNoteToggle}
              onTxtNoteRemove={this.props.onTxtNoteRemove}
              onTxtNoteSave={this.props.onTxtNoteSave}
              note={txtNote.note}
            />)
  }

  eachImage(imgNote) {
    return (<ImageNote
              key={imgNote.id}
              id={imgNote.id}
              src={imgNote.src}
              position={imgNote.position}
              editing={imgNote.editing}
              onImgNoteDrag={this.props.onImgNoteDrag}
              onImgNoteToggle={this.props.onImgNoteToggle}
              onImgNoteRemove={this.props.onImgNoteRemove}
              onImgNoteSave={this.props.onImgNoteSave}
            />)
  }

  render() {
    return (
      <div>
        {
          !this.props.activeBoard ? <div>Create a new board to start...</div> :

          <div className="board" style={{height: '100vh', width: '100%', position: 'relative', padding: '10px'}}>
             {this.props.activeBoard.txtNotes.map(this.eachNote, this)}
             {this.props.activeBoard.imgNotes.map(this.eachImage, this)}
          </div>
        }
      </div>
    )
  }
}

export default Board
