// App.js
import React, {Component} from 'react'

const TaskInput = (props) => { 
    return (
        <div>
            <h1>Hello, Enter you todo-list !</h1>
            <form>
                <input className="inputBlcok" value={props.inputValue} onChange={props.handleInput} type="text" />
                <input type="button" onClick={props.addTask} />
            </form>
        </div>
    )
}


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks :[],
            taskText: '',
            id: 1
        }
        this.addTask = this.addTask.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleTask = this.handleTask.bind(this)
        this.compeleteTask = this.compeleteTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }

    handleInput(e) {
        //console.log(this.state.taskText)
        this.setState({
            taskText: e.target.value
        })
    }

    addTask(e) {
        this.setState({
            tasks: [...this.state.tasks, {
                text: this.state.taskText, 
                id: this.state.id,
                isComplete: false
            }],
            id: this.state.id+1
        })
        this.state.taskText = ''
    }

    handleTask(e){
        console.log(e.target.id)
    }

    compeleteTask(e){
       console.log(e.target.id)
    }

    deleteTask(){

    }
        
    render() {
        const {tasks, taskText} = this.state
        
        return (
            <div>
                <TaskInput inputValue={taskText} handleInput={this.handleInput} addTask={this.addTask} />
                <div className="todo-list">
                    {tasks.map(task => (
                        <div>
                            <span>{task.text}</span>
                            <button id={task.id} onClick={this.compeleteTask}>Complete!</button>
                            <button id={task.id}  onClick={this.deleteTask}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default App