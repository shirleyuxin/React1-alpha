import React from 'react';
import './App.css';
// import Tabs from 'react-bootstrap/Tabs'
// import Tab from 'react-bootstrap/Tab'
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
//import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      cartCourses: [],
      cartMode: false,
      subjects: [],
      isOpen: false
    };
    this.updateCart = this.updateCart.bind(this);
  }

  componentDidMount() {
    fetch('http://mysqlcs639.cs.wisc.edu:53706/api/react/classes').then(
      res => res.json()
    ).then(data => this.setState({allCourses: data, filteredCourses: data,
       subjects: this.getSubjects(data)}));
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for(const course of Object.values(data)) {
      if(subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  getANewData() {
    let allCart = Object.assign({}, this.state.data);
  }

  setCourses(courses) {
    this.setState({filteredCourses: courses})
  }

  setCart(courses) {
    this.setState({cartCourses: courses})
  }

  updateCart(condition, course, section, sub) {
    if(condition === "add" && section === null && sub === null) {
      this.addCourse(course, null, null);
       
    } else
    if(condition === "remove" && section === null && sub === null) {
      this.removeCourse(course, null, null);
    } else
    if(condition === "add" && sub === null) {
      this.addCourse(course, section, null);
      //console.log(this.state.cartCourses);
      
    } else
    if(condition === "remove" && sub === null) {
      this.removeCourse(course, section, null);
      
    } else
    if(condition === "add") {
      this.addCourse(course, section, sub);
      
    } else
    if (condition === "remove") {
      this.removeCourse(course, section, sub);
      
    }

  }

  addCourse(course, section, sub) {
    const cart = this.state.cartCourses.slice(0);
    //const search = this.state.allCourses.slice(0);

    if(section === null && sub === null) {
      cart.push(course);
    } else
    if(sub === null) {
      for(const sec of Object.values(course.sections)) {
        if(sec.number !== section.number) {
          const index = course.sections.indexOf(sec);
          course.sections.splice(index, 1);
        }
      }
      cart.push(course);
    } else {
      for(const sec of Object.values(course.sections)) {
        if(sec.number !== section.number) {
          const index = course.sections.indexOf(sec);
          course.sections.splice(index, 1);
        }
      }
      //console.log(course.sections);
      for(const subsec of Object.values(course.sections[0].subsections)) {
        if(subsec.number !== sub.number) {
          const index = course.sections[0].subsections.indexOf(subsec);
          course.sections[0].subsections.splice(index, 1);
        }
      }

      cart.push(course);
    } 
    this.setCart(cart);
    //this.setCourses(search);
    //console.log(this.state.allCourses);
  }

  removeCourse(course, section, sub) {
    
    this.setCart(course);
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
     this.setState({ isOpen: false })
  }


  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Search and Add Courses</Navbar.Brand>
        </Navbar>

        {/* <Tabs defaultActiveKey="search" style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'white'}}>
          <Tab eventKey="search" title="Search" style={{paddingTop: '5vh'}}>
            <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects}/>
            <div style={{marginLeft: '20vw'}}>
              <CourseArea data={this.state.filteredCourses} allData={this.state.allCourses} cartMode={this.state.cartMode}
              updateCart = {this.updateCart}/>
          </div>
          </Tab>

          <Tab eventKey="cart" title="Cart" style={{paddingTop: '5vh'}}>
            <div style={{marginLeft: '5vw'}}>
              <CourseArea data={this.state.cartCourses} allData={this.state.allCourses} cartMode = {true} 
              updateCart = {this.updateCart}/>
            </div>
          </Tab>
        </Tabs>  */}

        <body>
        <div class = "row no-gutters">
            <div class = "col">
                <div style={{marginLeft: '2vw', marginRight: '1vw'}}>
                <Navbar>
                  <Navbar.Brand href="#home">Search</Navbar.Brand>
                  <Navbar.Toggle />
                  <NavDropdown title="Filter" id="basic-nav-dropdown" 
                  style={{width: 'calc(20vw - 5px)', marginLeft: '5px'}} onMouseEnter = {this.handleOpen} 
                  onMouseLeave = {this.handleClose} show={ this.state.isOpen } noCaret>
                      <NavDropdown.Item>
                      <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} 
                      subjects={this.state.subjects}/>
                      </NavDropdown.Item>
                  </NavDropdown>
                </Navbar>
                <CourseArea data={this.state.filteredCourses} allData={this.state.allCourses} cartMode={this.state.cartMode}
              updateCart = {this.updateCart} />
                </div>
            </div>

            <div class = "col">
                <div style={{marginLeft: '1vw', marginRight:'2vw'}}>
                <Navbar>
                  <Navbar.Brand href="#home">My Cart</Navbar.Brand>
                </Navbar>
                <CourseArea data={this.state.cartCourses} allData={this.state.allCourses} cartMode = {true} 
              updateCart = {this.updateCart}/>
                </div>
            </div>
        </div>
        </body>
      </>
    )
  }
}

export default App;
