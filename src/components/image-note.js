import React, { Component } from 'react'
import Draggable from 'react-draggable'

class ImageNote extends Component {
  constructor(){
    super()

  }

  render(){
    return (
      <Draggable>
        <div draggable="false" className="imageNote">
          <img src={this.props.src} height='150' width='150'/>
        </div>
      </Draggable>
    )
  }
}

export default ImageNote
