import React, { Component } from 'react'
import TextNote from './text-note'


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

    this.toggleEditing = this.toggleEditing.bind(this)
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

  handleSaveNote(){
    console.log('save');
  }

  toggleEditing(id){
    var txtNotes = [...this.state.txtNotes]
    var editingNote = txtNotes[id]
    var currentEditState = editingNote.editing
    editingNote.editing = !currentEditState
    this.setState({txtNotes})
  }

  eachNote(txtNote) {
    return (<TextNote
              key={txtNote.id}
              id={txtNote.id}
              editing={txtNote.editing}
              toggleEditing={() => this.toggleEditing(txtNote.id)}>
              {txtNote.note}
            </TextNote>)
  }

  render() {
    return (
      <div>
        <ul className="menu">
          <li onClick={()=> this.addNote('New Note')}> Text </li>
          <li onClick={()=> this.addNote('New Note')}> Image </li>
          <li onClick={()=> this.addNote('New Note')}> Sketch </li>
        </ul>
        <ul>
           {this.state.txtNotes.map(this.eachNote)}
        </ul>
      </div>
    )
  }
}

export default Board