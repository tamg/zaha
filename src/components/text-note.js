import React, { Component } from 'react'
import Draggable from 'react-draggable'

class TextNote extends Component {
  constructor(){
    super()
  }

  componentWillMount() { //set a random mounting position of note right before rendering
    this.style = {
      border: '1px solid black',
      width: '200px',
      padding: '10px',
      position: 'absolute',
      right: window.innerWidth/2 + 'px',
      top: window.innerHeight/2 + 'px',
      backgroundColor: 'white',
      boxShadow: '5px 5px 15px 0 rgba(0, 0, 0, .2)'
    }
  }

  edit() {
    this.props.toggleEditing(this.props.id)
  }

  save() {
    this.props.onSave(this.refs.newText.value, this.props.id) //whenver note is updated(clicked on save) pass newText and id to parent update function to handle it for us. after update handles newText, it updates the notes array which gets rerenderd
    this.props.toggleEditing(this.props.id)
  }

  remove() {
    this.props.onRemove(this.props.id)
  }

  editMode() {// render editing form
    return(
      <div className="note" style={this.style}>
        <textarea ref="newText" defaultValue={this.props.note}>
        </textarea>
        <button onClick={() => this.save()}> Save </button>
      </div>
    )
  }//ref is used to save input text data
    // when save is called on note component, it passes newText and id to the parent update funtion for an update

  displayMode() {// render note display
    return (
      <div className="textNote" style={this.style}>
        <p>{this.props.note}</p>
        <span>
          <button onClick={() => this.edit()}>EDIT</button>
          <button onClick={() => this.remove()}>X</button>
        </span>
      </div>
    )
  }

  //check if we are editing or displaying and display the right render
  render() {
    return ( <Draggable>
              {(this.props.editing) ? this.editMode() : this.displayMode()}
            </Draggable>)
          }
  }

  // render(){
  //   return (
  //     <Draggable>
  //       <div className="textNote" style={this.style}>
  //         <input className="textInput" />
  //         <button>Add </button>
  //       </div>
  //     </Draggable>
  //   )
  // }


export default TextNote
