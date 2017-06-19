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
      activeBoard: null
    }

  }

  componentWillMount() {
    this.addBoard()
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0 //first element gets 1 and uniqueId gets set to 0.
    return this.uniqueId++
  }

  addBoard() {
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

  findNote(id) {
    var txtNote
    var txtNotes = [...this.state.activeBoard.txtNotes]
    txtNotes.forEach((note) => {
      if(note.id === id) {
        txtNote = note
      }
  })
  return txtNote
}


  addNote(text) {
    var activeBoard = this.state.activeBoard
    var txtNotes = [...activeBoard.txtNotes,{
          id: this.nextId(),
          note: text,
          editing: false,
          position: {
            x: window.innerWidth/3,
            y: window.innerHeight/3
          }
        }]
    activeBoard.txtNotes = txtNotes
    this.setState({activeBoard})
  }

  onNoteDrag(e, position, id) {
    var activeBoard = this.state.activeBoard
    var txtNote = this.findNote(id)
    const {x, y} = position
    txtNote.position.x = x
    txtNote.position.y = y
    this.setState({activeBoard})
  }

  onToggle(id){
    var activeBoard = this.state.activeBoard
    var txtNotes = [...activeBoard.txtNotes]
    txtNotes.forEach((txtNote) => {
      if(txtNote.id === id) {
        var currentEditState = txtNote.editing //simplify
        txtNote.editing = !currentEditState
      }
    })
    activeBoard.txtNotes = txtNotes
    this.setState({activeBoard})
  }

  onSave(newText, id){
    var activeBoard = this.state.activeBoard
    var txtNotes = [...activeBoard.txtNotes]
    txtNotes.forEach((txtNote) => {
      if(txtNote.id === id) {
        txtNote.note = newText
      }
    })
    activeBoard.txtNotes = txtNotes
    this.setState({activeBoard})
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
      <div >
        <div>

        <MenuBar addBoard={this.addBoard.bind(this)}
                 addNote={() => this.addNote('New Note')}
                 addImage={() => this.addImage('https://cdn-images-1.medium.com/max/800/1*Cx4fcxgCFGgI3TyL43Ed1g.png')}
                 addSketch={() => this.addSketch()}/>
        </div>

        <div>

        <BoardList boards={this.state.boards}
                   changeBoard={this.changeBoard.bind(this)}/>
               </div>

      <div style={{height: '100vh'}}>
         <Board activeBoard={this.state.activeBoard}
                onNoteDrag={this.onNoteDrag.bind(this)}
                onToggle={this.onToggle.bind(this)}
                onSave={this.onSave.bind(this)}
                onRemove={this.onRemove.bind(this)}/>

       </div>

      </div>

    )
  }
}

export default App
