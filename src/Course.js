import React from 'react';
import { Card } from 'react-bootstrap';
import './App.css';
import Section from './Section';
import ListGroup from 'react-bootstrap/ListGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

class Course extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
        data: props.data,
         cartMode: props.cartMode,
         updateCart: props.updateCart,
		}
	}

  getC(course){
    if(course.credits === 1) {
      return "1 Credit";
    } else {
      return course.credits + " Credits";
    }
  }

  getR(course) {
    var req = "";
    //console.log(this.state.data)
    if(typeof course.requisites === undefined) {
      return "None";
    } else if(course.requisites.length === 0) {
      return "None";
    } else {
      for (var m = 0; m < course.requisites.length; m++) {
        if(course.requisites.length > 1) {
          if(m === course.requisites.length - 1) {
            req += "(" + course.requisites[m].join(" OR ") + ")";
          } else {
            req += "(" + course.requisites[m].join(" OR ") + ")" + " AND ";
          }
        } else {
          req += "(" + course.requisites[m].join(" OR ") + ")";
        }
      }
      return req;
    }
  }

  getSections(course) {
    let secs = [];
    //for(const course of Object.values(this.state.data)) {
    for(const section of Object.values(course.sections)) {
      secs.push (
        <Section key={section.number} data={section} 
        setcourse = {this.state.data}
        cartMode = {this.props.cartMode}
        cartCourses = {this.props.cartCourses}
        updateCart = {this.props.updateCart}
        color = {this.props.color}
        isclicked = {this.props.isclicked}/>
      )
    }
  
    return secs; 
  }


 

  render() {
  
    //console.log(this.state.data);
    //console.log(this.props.cartMode);
    if(this.state.cartMode === false) {
      //console.log(this.props.data)
      //console.log(this.state.cartMode);
      return (
        <Card> 
          <Card.Body>
        <div>
          <h3>({this.state.data.number}) {this.state.data.name} | ({this.getC(this.state.data)}) {""}
          <ToggleButtonGroup type="checkbox" className="mb-2">
            <ToggleButton onClick= {() => this.state.updateCart("add", this.state.data, null, null)} variant = "info" >
              Add Course</ToggleButton>
          </ToggleButtonGroup>
          </h3>
        <p><b>Subject:</b> {this.state.data.subject}</p>
        <p>{this.state.data.description}</p>
        <p><b>Requisites:</b> {this.getR(this.state.data)}</p>
        <p><u><b>Keywords:</b></u> {this.state.data.keywords.join(", ")}</p>
        <h4>Sections</h4>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
          {this.getSections(this.state.data)}
          </ListGroup.Item>
        </ListGroup>
        </div>
        </Card.Body>
        </Card>
      )
     }
    else {
      //console.log(this.state.data);
      //console.log(this.state.data)
      //console.log(this.state.cartMode);
      return (
        <Card > 
          <Card.Body>
        <div>
          <h3>({this.state.data.number}) {this.state.data.name} | ({this.getC(this.state.data)}) {""}
          <ToggleButtonGroup type = "checkbox" className="mb-2">
            <ToggleButton onClick= {() => this.state.updateCart("remove", this.state.data, null, null)} variant = "danger">
              Remove Course</ToggleButton>
          </ToggleButtonGroup>
          </h3>
        <p><b>Subject:</b> {this.state.data.subject}</p>
        <p>{this.state.data.description}</p>
        <p><b>Requisites:</b> {this.getR(this.state.data)}</p>
        <p><u><b>Keywords:</b></u> {this.state.data.keywords.join(", ")}</p>
        <h4>Sections</h4>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
        {this.getSections(this.state.data)}
        </ListGroup.Item>
        </ListGroup>
        </div>
        </Card.Body>
        </Card>
      )
    }
  }
}

export default Course;
