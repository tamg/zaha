import React, { Component } from 'react'

const MenuBar = (props) => {
  return(
    <div>
      <ul className="menu">
        <li onClick={props.addNote}> Text </li>
        <li onClick={props.addImage}> Image </li>
        <li onClick={props.addSketch}> Sketch </li>
      </ul>
    </div>
  )
}

export default MenuBar
