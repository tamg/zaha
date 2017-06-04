import React, { Component } from 'react'
import Draggable from 'react-draggable'

class TextNote extends Component {

  componentWillMount() { //set a random mounting position of note right before rendering
    this.style = {
      border: '1px solid black',
      width: '200px',
      padding: '10px',
      position: 'absolute',
      right: window.innerWidth/2 + 'px',
      top: window.innerHeight/2 + 'px',
      backgroundColor: 'white',
    }
  }

  render(){
    return (
      <Draggable>
        <div className="textNote" style={this.style}>
          <textarea className="textInput">

          </textarea>
        </div>
      </Draggable>
    )
  }
}

export default TextNote
