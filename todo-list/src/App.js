import React, {Component} from 'react'
import './style.scss'

class Input extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className="task-input">
                <form>
                    <input type="text" onChange={this.props.handleTaskText} className="taskInputBlock" value={this.props.inputValue} />
                    <input type="button" onClick={this.props.addTask} value="Send" />
                 </form>
           </div>
        )
    }
}

class TodoList extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const tasks = this.props.todoListContext 
        return (
            <div className="todo-list">
                {tasks.map(task => (
                    <div className="todo-list-task">
                        <span>{task.isComplete ? `完成!` : `快去做!`}</span>
                        <span dataid={task.taskId}>{task.taskText}</span>
                        <input type="button" value="Complete" onClick={this.props.completeTask.bind(this,task.taskId)} />
                        <input type="button" value="Delete" onClick={this.props.deleteTask.bind(this,task.taskId)}/>
                    </div>
                ))}
            </div>
        )
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            tasks : [],
            taskText : '',
            taskId : 1
        }
        
        this.addTask = this.addTask.bind(this)
        this.handleTaskText = this.handleTaskText.bind(this)
        this.completeTask = this.completeTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }

    completeTask(id) {
        const {tasks} = this.state
        this.setState({
            tasks: tasks.map(task => {
                if (task.taskId === id) {
                    return {
                        ...task,
                        isComplete: !task.isComplete
                    }
                } return task
            })
        })
    }

    deleteTask(id) {
        const {tasks} = this.state
        this.setState({
            tasks: tasks.filter(task => (
                task.taskId !== id
            ))
        })
    }

    handleTaskText(e) {
        this.setState({
            taskText : e.target.value
        })
    }

    addTask() {
        const {tasks, taskText, taskId} = this.state
        this.setState({
            tasks : [...tasks, {
                taskId: taskId,
                taskText: taskText,
                isComplete: false
            }],
            taskText: '',
            taskId : taskId + 1
        })
        //console.log(tasks)
    }

    render() {
        const {tasks, taskText, taskId} = this.state
        return (
            <div>
                <Input inputValue={taskText} handleTaskText={this.handleTaskText} addTask={this.addTask} />
                <TodoList todoListContext={tasks} completeTask={this.completeTask} deleteTask={this.deleteTask}/>
            </div>
           
        )
    }
}
 

export default App