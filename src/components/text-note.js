import React, { Component } from 'react'
import Draggable from 'react-draggable'

class TextNote extends Component {

  componentWillMount() { //set a random mounting position of note right before rendering
    this.style = {
      right: 50,
      top: 50,
      backgroundColor: 'red',
    }
  }

  render(){
    return (
      <Draggable>
        <div className="textNote" style={this.style}>
          <div>Title </div>
          <div>Note</div>
        </div>
      </Draggable>
    )
  }
}

export default TextNote
