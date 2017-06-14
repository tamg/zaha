import React, { Component } from 'react'

const BoardList = (props) => {
  if(!props.boards){
    return 
  }
  var boards = props.boards.map((board) => {
    return(
      <li key={board.id}> {board.title} </li>
    )
  })

  return(
    <div>
      <ul className="board-list">
        {boards}
      </ul>
    </div>
  )
}

export default BoardList
