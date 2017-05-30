import React, { Component } from 'react'

class TextNote extends Component {

  count() {
    var c = 0
    this.setState({note: c++ })
  }

  render(){
    return (
      <div className="textNote">
        <div onClick={this.props.onClick} >Title </div>
        <div>Note</div>
      </div>
    )
  }
}

export default TextNote
