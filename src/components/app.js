import React, { Component } from 'react'
import MenuBar from './menu-bar'
import BoardList from './board-list'
import Board from './board'
import TextNote from './text-note'
import ImageNote from './image-note'
import SketchNote from './sketch-note'

class App extends Component {
  constructor() {
    super()

    const board = {
      id: 0,
      title: 'default',
      txtNotes: [{
        id: 0,
        note: 'neeeew note',
        editing: false
      }]
    }

    this.state = {
      boards: [],
      activeBoard: board
    }
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0 //first element gets 1 and uniqueId gets set to 0.
    return this.uniqueId++
  }

  addBoard() {
    console.log('adding');
    var boards = [...this.state.boards,
    {
      id: this.nextId(),
      title: `New Board`, //rename later
      txtNotes:[],
      imageNotes:[],
      sketchNotes:[]
    }]
    var activeBoard = boards[boards.length-1]
    this.setState({boards, activeBoard})
  }

  addNote(text) {
    var activeBoardId = this.state.activeBoard.id
    var boards = this.state.boards.map((board) => {
      console.log(board.id);
      if(board.id === activeBoardId) {
        var txtNotes = [...board.txtNotes,
        {
          id: this.nextId(),
          note: text,
          editing: false
        }]
      }
    })

    this.setState({boards})
  }

  onToggle(id){
    console.log(this);
    var txtNotes = this.state.boards.txtNotes.map((note) => {
      if(note.id === id){
        var currentEditState = note.editing //simplify
        note.editing = !currentEditState
        return note
      }
      return note
    })
    this.setState({txtNotes})
  }

  onSave(newText, id){
    var txtNotes = this.state.boards.txtNotes.map((note) => {
      if(note.id === id){
        note.note = newText
        return note
      }
      return note
    })
    this.setState({txtNotes})
  }

  onRemove(id){
    var txtNotes = this.state.boards.txtNotes.filter(note => note.id !== id)
    this.setState({txtNotes: txtNotes})
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
          addBoard={this.addBoard.bind(this)}
          addNote={() => this.addNote('New Note')}
          addImage={() => this.addImage('https://cdn-images-1.medium.com/max/800/1*Cx4fcxgCFGgI3TyL43Ed1g.png')}
          addSketch={() => this.addSketch()}/>

        <BoardList boards={this.state.boards} />

        <Board activeBoard={this.state.activeBoard}
               onToggle={this.onToggle.bind(this)}
               onSave={this.onSave.bind(this)}
               onRemove={this.onRemove.bind(this)}/>
      </div>

    )
  }
}

export default App
