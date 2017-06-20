import React, { Component } from 'react'

const MenuBar = (props) => {
  return(
    <div>
      <ul className="menu">
        <li onClick={props.addBoard}> +Board </li>
        <li onClick={() => props.onAddTxtNote('text')}> +Text </li>
        <li onClick={() => props.onAddImgNote('image')}> +Image </li>
      </ul>
    </div>
  )
}

export default MenuBar
