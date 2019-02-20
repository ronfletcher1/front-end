import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'; 

class Edit extends Component{
    constructor(){
        super();
        this.state = {
            task: {}
        }
    }
    componentDidMount(){
        console.log(this.props)
        const tid = this.props.match.params.id;
        
        axios({
            method: 'GET',
            url: `http://localhost:3000/getTask/${tid}`
        }).then((taskFromBackEnd)=>{
            this.setState({
                task: taskFromBackEnd.data.task
            })
        })
    }

    changeTask = (e)=>{
        const value = e.target.value;
        let taskStateCopy = {...this.state.task}
        // stateCopy "unpacks" ...this.stat.task to convert property to object
        // let stateCopy = Object.assign({},this.state.task)
        taskStateCopy.taskName = value;
        this.setState({
            task: taskStateCopy
        })
    }

    changeDate = (e)=>{
        let value = e.target.value;
        let taskStateCopy = {...this.state.task}
        taskStateCopy.task.taskDate = moment(value).format('YYYY-MM-DD');
        this.setState({
            task: taskStateCopy
        })
    }

    editTask = (e)=>{
        e.preventDefault()
        axios({
            method: "POST",
            data: {
                task: this.state.task,
                id: this.props.match.params.id
            },
            url: `http://localhost:3000/edit/`
        }).then ((jsonData)=>{
            console.log(jsonData.data);
            if(jsonData.data.msg === 'updated'){
                // the backend, whoever and whatever is, succeded
                // moving on...
                this.props.history.push('/');
            }

        })
    }

    render(){
        console.log(this.state.task);
        return(
            <div className="container">
                <form onSubmit={this.editTask} className="add-box">
                    <input onChange={this.changeTask} type="text" id="new-task" value={this.state.task.taskName} />
                    <input onChange={this.changeDate} type="date" id="new-task-date" value={moment(this.state.task.taskDate).format('YYYY-MM-DD')}/>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>            
            </div>
        )
    }

}

export default Edit;