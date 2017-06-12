import React, { Component } from 'react'
import Draggable from 'react-draggable'

class ImageNote extends Component {
  constructor(){
    super()

  }

  componentWillMount() {
		this.style = {
			border: '1px solid black',
			padding: '10px',
			position: 'absolute',
			// right: window.innerWidth/2 + 'px',
			// top: window.innerHeight/2 + 'px',
			backgroundColor: 'white',
			boxShadow: '5px 5px 15px 0 rgba(0, 0, 0, .2)'
		}
	}

  render(){
    return (

      <Draggable handle='strong'>
      <div style={this.style}>
        <strong className="cursor"><div className="drag-bar">Drag here</div></strong>
        <img src={this.props.src} height='150' width='150'/>
      </div>
      </Draggable>
    )
  }
}

export default ImageNote
