import React from 'react'
import './App.css'
import Subsection from './Subsection.js'
import ListGroup from 'react-bootstrap/ListGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';


class Section extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		 	data: props.data,
			 cartMode: props.cartMode,
			 setcourse: props.setcourse,
			 updateCart: props.updateCart
		}
	}
	  

	getTime() {
		// let time = "";
		// for(let i in this.props.data.time) {
		// 	time += <li>i + ": " + this.props.data.time[i] </li>;
		// }
		return <div>
			{Object.keys(this.state.data.time).map((time) => 
			(<li>{time}: {this.state.data.time[time]}</li>))}
		</div>;
	}

	getSubsections() {
		let subs = [];
  
    	for(const subsection of Object.values(this.state.data.subsections)) {
      		subs.push (
				<Subsection key={subsection.number} data={subsection} 
				setcourse = {this.state.setcourse}
				setsec = {this.state.data}
				cartMode = {this.state.cartMode}
				updateCart = {this.state.updateCart}/>
      		)
    	}
    	//console.log(subs);
    	return subs; 
	}

	render() {
		//console.log(this.props.data);
		if(!this.state.cartMode) {
			return ( 
			<div>
				<h5>{this.state.data.number} {""}
				<ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
					<ToggleButton onClick = {() => this.state.updateCart("add", this.state.setcourse, this.state.data, null)} 
					variant = "info" >
						Add Section</ToggleButton>

				</ToggleButtonGroup>
				</h5>
				<p><b>Instructor:</b> {this.state.data.instructor}</p>
				<p><b>Location:</b> {this.state.data.location}</p>
				<p><b>Meeting Times</b></p>
				<p>{this.getTime()}</p>
				<h6><b>Subsections</b></h6>
				<ListGroup className="list-group-flush">
				<ListGroup.Item>
				{this.getSubsections()}
				</ListGroup.Item>
				</ListGroup>
			</div>
			)
		} else {
			return (
				<div>
					<h5>{this.state.data.number} {""}
					<ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
						<ToggleButton onClick = {() => this.state.updateCart("remove", this.state.setcourse, this.state.data, null)} 
						variant = "danger" >
							Remove Section</ToggleButton>
					</ToggleButtonGroup>
					</h5>
					<p><b>Instructor:</b> {this.state.data.instructor}</p>
					<p><b>Location:</b> {this.state.data.location}</p>
					<p><b>Meeting Times</b></p>
					<p>{this.getTime()}</p>
					<h6><b>Subsections</b></h6>
					<ListGroup className="list-group-flush">
				<ListGroup.Item>
					{this.getSubsections()}
					</ListGroup.Item>
				</ListGroup>
				</div>
			)
		}
	}
}

export default Section;