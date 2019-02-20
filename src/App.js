import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';
import Edit from './Edit';

class App extends Component {
  constructor(){
    super();
    this.state = {
      taskList: []
    }
  }
componentDidMount(){
  axios({
    method: 'GET',
    url: 'http://localhost:3000/getTasks',
  }).then((taskListFromBackEnd)=>{
    console.log(taskListFromBackEnd)
    this.setState({
      taskList: taskListFromBackEnd.data
    })
  })
}

  addNewTask=(task, date)=>{
    console.dir(task, date);
    axios({
      method: 'Post',
      url: 'http://localhost:3000/addTask',
      data: {
        taskName: task,
        taskDate: date
      }
    }).then((backEndResponse)=>{
      console.log(backEndResponse)
      this.setState({
        taskList: backEndResponse.data
      })
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
      <NavBar />
      <Route exact path="/" render={()=>{
        return (<Home taskList={this.state.taskList} addNewTask={this.addNewTask} />)
      }} />

      <Route exact path="/edit/:id" component={Edit} />
        
      </div>
      </Router>
    );
  }
}

export default App;
