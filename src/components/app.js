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
        editing: false,
        position: {
          x: window.innerWidth/2,
          y: window.innerHeight/2
        }
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

  changeBoard(id) {
    this.state.boards.forEach((board) => {
      if(board.id === id) {
        var activeBoard = board
        this.setState({activeBoard})
      }
    })
  }

  onNoteDrag(e, ui) {
    console.log(e, ui);
    // var activeBoardId = this.state.activeBoard.id
    // var boards = this.state.boards.map((board) => {
    //   if(board.id === activeBoardId) {
    //     var txtNotes = [...board.txtNotes]
    //     txtNotes.forEach((txtNote) => {
    //       if(txtNote.id === id) {
    //         const {x, y} = txtNote.position
    //         txtNote.position.x = x + ui.deltaX
    //         txtNote.position.y = y + ui.deltaY
    //       }
    //     })
    //     board.txtNotes = txtNotes
    //     return board
    //   }
    //   return board
    // })
    // this.setState({boards})
  }

  addNote(text) {
    var activeBoardId = this.state.activeBoard.id
    var boards = this.state.boards.map((board) => {
      if(board.id === activeBoardId) {
        var txtNotes = [...board.txtNotes,
        {
          id: this.nextId(),
          note: text,
          editing: false,
          position: {
            x: window.innerWidth/2,
            y: window.innerHeight/2
          }
        }]
        board.txtNotes = txtNotes
        return board
      }
      return board
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
        <MenuBar addBoard={this.addBoard.bind(this)}
                 addNote={() => this.addNote('New Note')}
                 addImage={() => this.addImage('https://cdn-images-1.medium.com/max/800/1*Cx4fcxgCFGgI3TyL43Ed1g.png')}
                 addSketch={() => this.addSketch()}/>

        <BoardList boards={this.state.boards}
                   changeBoard={this.changeBoard.bind(this)}/>

        <Board activeBoard={this.state.activeBoard}
               onNoteDrag={this.onNoteDrag.bind(this)}
               onToggle={this.onToggle.bind(this)}
               onSave={this.onSave.bind(this)}
               onRemove={this.onRemove.bind(this)}/>
      </div>

    )
  }
}

export default App
