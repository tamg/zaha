import React, { Component } from 'react'
import TextNote from './text-note'

class Board extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  //add a txt note

  //add a url

  //add a Sketch

  //update

  //remove

  handleClick() {
    alert('handleClick from parent')
  }


  render() {
    return (
      <div>
        <ul className="menu">
          <li onClick={()=> alert('clicked')}> Text </li>
          <li > Image </li>
          <li > Sketch </li>
        </ul>
        <TextNote note={"hello"} onClick={() => this.handleClick()}/>
      </div>
    )
  }
}

export default Board
