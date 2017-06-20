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
    // this.addBoard()
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0 //first element gets 1 and uniqueId gets set to 0.
    return this.uniqueId++
  }

  addBoard() {
    var boards = [...this.state.boards,
    {
      id: this.nextId(),
      title: `New Board..3`, //rename later
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

  onNoteDrag(e, position, id) {
    // console.log(e, position, id);
    var activeBoardId = this.state.activeBoard.id
    var boards = this.state.boards.map((board) => {
      if(board.id === activeBoardId) {
        var txtNotes = [...board.txtNotes]
        txtNotes.forEach((txtNote) => {
          if(txtNote.id === id) {
            const {x, y} = position
            txtNote.position.x = x
            txtNote.position.y = y
          }
        })
        board.txtNotes = txtNotes
        return board
      }
      return board
    })
    this.setState({boards})
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
            x: window.innerWidth/3,
            y: window.innerHeight/3
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
    var activeBoardId = this.state.activeBoard.id
    var boards = this.state.boards.map((board) => {
      if(board.id === activeBoardId) {
        var txtNotes = [...board.txtNotes]
        txtNotes.forEach((txtNote) => {
          if(txtNote.id === id) {
            var currentEditState = txtNote.editing //simplify
            txtNote.editing = !currentEditState
          }
        })
        board.txtNotes = txtNotes
        return board
      }
      return board
    })
    this.setState({boards})
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
      <div >
        <div>

        <MenuBar addBoard={this.addBoard.bind(this)}
                 addNote={() => this.addNote('New Note')}
                 addImage={() => this.addImage('https://cdn-images-1.medium.com/max/800/1*Cx4fcxgCFGgI3TyL43Ed1g.png')}
                 addSketch={() => this.addSketch()}/>
        </div>

        <div>

        <BoardList boards={this.state.boards}
                   activeBoard={this.state.activeBoard}
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
