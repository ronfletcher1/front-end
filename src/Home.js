import React, { Component } from 'react';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            task: "",
            date: ""
        }
        this.changeDate = this.changeDate.bind(this)
        this.changeTask = this.changeTask.bind(this)
    }

    addNewTask = (event)=>{
        event.preventDefault();
        console.log("someone submitted the form!!");
        this.props.addNewTask(this.state.task, this.state.date)
    }

    changeDate = (event)=>{
        console.log(event.target.value)
        this.setState({
            date: event.target.value
        })
    }

    changeTask = (event)=>{
        console.log(event.target.value)
        this.setState({
            task: event.target.value
        })
    }

    render(){   
        return(
            <div className="to-do-app">
                        
            <div className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <h1 className="header center orange-text">To-Do List</h1>
                    <div className="row center">
                        <h5 className="header col s12 light">Made with React and Express</h5>
                    </div>
                </div>
            </div>    
            <div className="container">
                <form onSubmit={this.addNewTask} className="add-box">
                    <input onChange={this.changeTask} type="text" id="new-task" placeholder="New Task" value={this.state.task} />
                    <input onChange={this.changeDate} type="date" id="new-task-date" value={this.state.date} />
                    <button type="submit" className="btn btn-primary">Add Task</button>
                </form>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
            </div>  
        )
}
}
export default Home;