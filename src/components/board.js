import React, { Component } from 'react'
import TextNote from './text-note'
import ImageNote from './image-note'


class Board extends Component {
  constructor() {
    super()
    this.state = {
      txtNotes: [],
      urlNotes: [],
      imageNotes: [],
      videoNotes: [],
      sketchNotes: []
    }
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0 //first element gets 1 and uniqueId gets set to 0.
    return this.uniqueId++
  }

  addNote(text) {
    var txtNotes = [...this.state.txtNotes,
        {
          id: this.nextId(),
          note: text,
          editing: false
        }]
    this.setState({txtNotes})
  }

  toggleEditing(id){
    var txtNotes = this.state.txtNotes.map((note) => {
      if(note.id === id){
        var currentEditState = note.editing
        note.editing = !currentEditState
        return note
      }
      return note
    })
    this.setState({txtNotes})
  }

  onSave(newText, id){
    var txtNotes = this.state.txtNotes.map((note) => {
      if(note.id === id){
        note.note = newText
        return note
      }
      return note
    })
    this.setState({txtNotes})
  }

  onRemove(id){
    var txtNotes = this.state.txtNotes.filter(note => note.id !== id)
    this.setState({txtNotes})
  }

  eachNote(txtNote) {
    return (<TextNote
              key={txtNote.id}
              id={txtNote.id}
              editing={txtNote.editing}
              toggleEditing={this.toggleEditing.bind(this)}
              onRemove={this.onRemove.bind(this)}
              onSave={this.onSave.bind(this)}
              note={txtNote.note}
            />)
  }

  addImage(src){
    var imageNotes = [...this.state.imageNotes,
        {
          id: this.nextId(),
          src: src,
        }]
    this.setState({imageNotes})
  }

  eachImage(imageNote) {
    return (<ImageNote
              key={imageNote.id}
              id={imageNote.id}
              src={imageNote.src}
              toggleEditing={this.toggleEditing.bind(this)}
              onRemove={this.onRemove.bind(this)}
              onSave={this.onSave.bind(this)}
            />)
  }

  render() {
    return (
      <div>
        <ul className="menu">
          <li onClick={()=> this.addNote('New Notee')}> Text </li>
          <li onClick={()=> this.addImage('https://cdn-images-1.medium.com/max/800/1*Cx4fcxgCFGgI3TyL43Ed1g.png')}> Image </li>
          <li onClick={()=> this.addNote('New Note')}> Sketch </li>
        </ul>
        <ul>
           {this.state.txtNotes.map(this.eachNote, this)}
           {this.state.imageNotes.map(this.eachImage, this)}
        </ul>
      </div>
    )
  }
}

export default Board
