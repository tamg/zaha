import React, { Component } from 'react'
import MenuBar from './menu-bar'
import Board from './board'
import TextNote from './text-note'
import ImageNote from './image-note'
import SketchNote from './sketch-note'

class App extends Component {
  constructor() {
    super()

    const board = {
      txtNotes: [{
        id: 0,
        note: 'neeeew note',
        editing: false
      }]
    }

    this.state = {
      boards:[],
      activeBoard: board
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

  addImage(src){
    var imageNotes = [...this.state.imageNotes,
        {
          id: this.nextId(),
          src: src,
        }]
    this.setState({imageNotes})
  }

  addSketch(){
    var sketchNotes = [...this.state.sketchNotes,
        {
          id: this.nextId(),
        }]
    this.setState({sketchNotes})
  }

  render() {
    return (
      <div>
        <MenuBar
          addNote={() => this.addNote('New Note')}
          addImage={() => this.addImage('https://cdn-images-1.medium.com/max/800/1*Cx4fcxgCFGgI3TyL43Ed1g.png')}
          addSketch={() => this.addSketch()}/>

        <Board activeBoard={this.state.activeBoard}/>
      </div>

    )
  }
}

export default App
