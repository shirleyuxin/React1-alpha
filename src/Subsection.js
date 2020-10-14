import React from 'react'
import './App.css'
//import { Button } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

class Subsection extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		 	data: props.data,
			 cartMode: props.cartMode,
			 setcourse: props.setcourse,
			 setsec: props.setsec,
			 updateCart: props.updateCart
		}
	}

	getnum() {
		if(typeof this.state.data  === undefined || this.state.data === null  || this.state.data.length === null  || this.state.data.length === 0) {
			return "None";
		} else {
			return this.state.data.number;
		}
	}

	gettime() {
		// let time = "";
		// for(let i in this.props.data.time) {
		// 	time += i + ": " + this.props.data.time[i] + "\n";
		// }
		return (<div>
			{Object.keys(this.state.data.time).map((time) => 
				(<li>{time}: {this.state.data.time[time]}</li>))}
		</div>);
	}

	render() {
		//console.log(this.props.data);
		if(!this.state.cartMode) {
		return (
			<div>
				<p><b>{this.getnum()} {""}
				<ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
					<ToggleButton onClick = {() => this.state.updateCart("add", this.state.setcourse, this.state.setsec, this.state.data)}
					variant = "info">
						Add Subsection</ToggleButton>
				</ToggleButtonGroup>
				</b>
				</p>
				<p>{this.state.data.location}</p>
				<p><b>Meeting Times</b></p>
				<p>{this.gettime()}</p>
			</div>
		)
		} else {
			return (
				<div>
					<p><b>{this.getnum()} {""}
					<ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
						<ToggleButton onClick = {() => this.state.updateCart("remove", this.state.setcourse, this.state.setsec, this.state.data)} 
						variant = "danger">
							Remove Subsection</ToggleButton>
					</ToggleButtonGroup>
					</b>
					</p>
					<p>{this.state.data.location}</p>
					<p><b>Meeting Times</b></p>
					<p>{this.gettime()}</p>
				</div>
			)
		}
	}
}

export default Subsection;