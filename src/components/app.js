import React, { Component } from 'react'
import MenuBar from './menu-bar'
import BoardList from './board-list'
import BoardTitle from './board-title'
import Board from './board'
import TextNote from './text-note'
import ImageNote from './image-note'

class App extends Component {
  constructor() {
    super()

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
    return this.uniqueId++;
  }

  addBoard() {
    this.boardId = this.boardId || 1
    var newBoardId = this.boardId++
    var boards = [...this.state.boards,
    {
      id: newBoardId,
      title: `Board ${newBoardId}`,
      txtNotes:[],
      imgNotes:[],
      sketchNotes:[]
    }]
    var activeBoard = boards[boards.length-1]
    this.setState({boards, activeBoard})
  }

  deleteBoard(id) {
    if(this.state.boards.length === 1) { return } //always leave one board displayed
    var boards = [...this.state.boards].filter(board => board.id !== id)
    var activeBoard = boards.length === 1 ? boards[0] : boards[boards.length-1]
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

  onTitleChange(newText, id) {
    var activeBoard = this.state.activeBoard
    activeBoard.title = newText
    this.setState({activeBoard})
  }

  findTxtNote(id) {
    var txtNote
    var txtNotes = [...this.state.activeBoard.txtNotes]
    txtNotes.forEach((note) => {
      if(note.id === id) {
        txtNote = note
      }
    })
    return txtNote
  }

  onAddTxtNote() {
    var activeBoard = this.state.activeBoard
    var txtNotes = [...activeBoard.txtNotes,{
          id: this.nextId(),
          note: 'Drag to move or Double Click to edit note :)',
          editing: false,
          color: '#db3e00',
          position: {
            x: 160,
            y: 30
          }
        }]
    activeBoard.txtNotes = txtNotes
    this.setState({activeBoard})
  }

  onTxtNoteDrag(e, position, id) {
    var activeBoard = this.state.activeBoard
    var txtNote = this.findTxtNote(id)
    const {x, y} = position
    txtNote.position.x = x
    txtNote.position.y = y
    this.setState({activeBoard})
  }

  onTxtNoteToggle(id){
    var activeBoard = this.state.activeBoard
    var txtNote = this.findTxtNote(id)
    var currentEditState = txtNote.editing //simplify
    txtNote.editing = !currentEditState
    this.setState({activeBoard})
  }

  onTxtNoteSave(newText, id){
    var activeBoard = this.state.activeBoard
    var txtNote = this.findTxtNote(id)
    txtNote.note = newText
    this.setState({activeBoard})
  }

  onTxtNoteRemove(id){
    var activeBoard = this.state.activeBoard
    var txtNotes = activeBoard.txtNotes.filter(note => note.id !== id)
    activeBoard.txtNotes = txtNotes
    this.setState({activeBoard})
  }


  onColorChange(color, id) {
    var activeBoard = this.state.activeBoard
    var txtNote = this.findTxtNote(id)
    txtNote.color = color
    this.setState({activeBoard})
  }

  findImgNote(id) {
    var imgNote
    var imgNotes = [...this.state.activeBoard.imgNotes]
    imgNotes.forEach((note) => {
      if(note.id === id) {
        imgNote = note
      }
    })
    return imgNote
  }

  onAddImgNote(){
    var activeBoard = this.state.activeBoard
    var imgNotes = [...activeBoard.imgNotes,
      {
        id: this.nextId(),
        src: '',
        editing: true,
        imgWidth: null,
        imgHeight: null,
        position: {
          x: 160,
          y: 30
        }
      }]
    activeBoard.imgNotes = imgNotes
    this.setState({activeBoard})
  }

  onImgNoteDrag(e, position, id) {
    var activeBoard = this.state.activeBoard
    var imgNote = this.findImgNote(id)
    const {x, y} = position
    imgNote.position.x = x
    imgNote.position.y = y
    this.setState({activeBoard})
  }

  onImgNoteToggle(id){
    var activeBoard = this.state.activeBoard
    var imgNote = this.findImgNote(id)
    var currentEditState = imgNote.editing //simplify
    imgNote.editing = !currentEditState
    this.setState({activeBoard})
  }

  onImgNoteSave(src, id, imgWidth, imgHeight){
    var activeBoard = this.state.activeBoard
    var imgNote = this.findImgNote(id)
    imgNote.src = src
    imgNote.imgHeight = imgHeight + 'px'
    imgNote.imgWidth = imgWidth + 'px'
    this.setState({activeBoard})
  }

  onImgNoteRemove(id){
    var activeBoard = this.state.activeBoard
    var imgNotes = activeBoard.imgNotes.filter(note => note.id !== id)
    activeBoard.imgNotes = imgNotes
    this.setState({activeBoard})
  }

  render() {
    return (
      <div >
        <div className="header">
          <div className="boardListContainer">
            <BoardList boards={this.state.boards}
                       activeBoard={this.state.activeBoard}
                       changeBoard={this.changeBoard.bind(this)}/>
          </div>

          <div className="menuContainer">
            <MenuBar activeBoard={this.state.activeBoard}
                     addBoard={this.addBoard.bind(this)}
                     deleteBoard={this.deleteBoard.bind(this)}
                     onAddTxtNote={this.onAddTxtNote.bind(this)}
                     onAddImgNote={this.onAddImgNote.bind(this)}/>
          </div>

          <div className="boardTitle">
            <BoardTitle activeBoard={this.state.activeBoard}
                        onTitleChange={this.onTitleChange.bind(this)}/>
          </div>
        </div>

        <div className="boardContainer" style={{height: '100vh'}}>
          <Board activeBoard={this.state.activeBoard}
                 onTxtNoteDrag={this.onTxtNoteDrag.bind(this)}
                 onTxtNoteToggle={this.onTxtNoteToggle.bind(this)}
                 onTxtNoteSave={this.onTxtNoteSave.bind(this)}
                 onTxtNoteRemove={this.onTxtNoteRemove.bind(this)}
                 onColorChange={this.onColorChange.bind(this)}
                 onImgNoteDrag={this.onImgNoteDrag.bind(this)}
                 onImgNoteToggle={this.onImgNoteToggle.bind(this)}
                 onImgNoteSave={this.onImgNoteSave.bind(this)}
                 onImgNoteRemove={this.onImgNoteRemove.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default App
