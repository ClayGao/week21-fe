// App.js
import React, {Component} from 'react'

class Input extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <form>
                <input type="text" onChange={this.props.handleTaskText} className="taskInputBlock" value={this.props.taskText} />
                <input type="button" onClick={this.props.addTask} value="Send" />
           </form>
        )
    }
}

class TodoList extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const {tasks} = this.props // 為什麼是 undefined ?
        console.log(this.props)
        return (
            <div className="todo-list">
               {/* 作到這邊 */}
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
    }

    handleTaskText(e) {
        this.setState({
            textText : e.target.value
        })
    }

    addTask() {
        this.setState({
            tasks : [...this.state.tasks, {
                taskId: this.state.taskId,
                taskText: this.state.taskText,
                isComplete: false
            }],
            taskId: this.state.taskId + 1
        })
        this.state.taskText = ''
    }

    render() {
        return (
            <div>
                <Input inputValue={this.state.taskText} handleTaskText={this.handleTaskText} addTask={this.addTask} />
                <TodoList todoListContext={this.state.tasks}/>
            </div>
           
        )
    }
}
 

export default App