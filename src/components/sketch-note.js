import React, { Component } from'react'
import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketches/sketch'
import sketch2 from './sketches/sketch2'
import Draggable from 'react-draggable'

class SketchNote extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rotation: 150,
			stateSketch: sketch,
		};
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

	rotationChange(e){
		this.setState({rotation:e.target.value});
	}

	pressEvent(){
		this.state.stateSketch === sketch ? this.setState({stateSketch:sketch2}) : this.setState({stateSketch:sketch});
	}

	render () {
		return (
			<Draggable handle="strong">
			<div style={this.style}>
				<strong className="cursor"><div className="drag-bar">Drag here</div></strong>
				<P5Wrapper sketch={this.state.stateSketch} rotation={this.state.rotation}/>
				<input type="range" value={this.state.rotation}  min="0"  max="360" step="1" onInput={this.rotationChange.bind(this)}/>
				<button onClick={this.pressEvent.bind(this)}>Change Sketch</button>
			</div>
			</Draggable>
		);
	}
}

export default SketchNote
