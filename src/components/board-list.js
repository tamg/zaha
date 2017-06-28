import React, { Component } from 'react'

class BoardList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
  }

  // componentWillMount() {
  //   if(!this.props.activeBoard){
  //     console.log('none');
  //     return
  //   }
  //   // this.setState({value: this.props.activeBoard.id})
  // }

  componentWillReceiveProps(nextProps) {
    if(this.props.activeBoard && nextProps) {
      if(JSON.stringify(this.props.activeBoard.id) !== JSON.stringify(nextProps.activeBoard.id)){
        this.setState({value: nextProps.activeBoard.id})
      }
    }
  }

  eachBoard(board) {
    return(<option key={board.id}
            value={board.id}>
            {board.title}
          </option>)
  }

  handleChange(event) {
    var value = parseInt(event.target.value)
    this.props.changeBoard(value)
    this.setState({value})
  }

  render() {
    return(
      <div className='boardList'>
        <form >
            <label> Current Board
            <select  value={this.state.value} onChange={this.handleChange.bind(this)}>
              {this.props.boards.map(this.eachBoard, this)}
            </select>
          </label>
        </form>
      </div>
    )
  }
}

export default BoardList
