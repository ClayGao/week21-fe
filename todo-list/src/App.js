// App.js
import React, {Component} from 'react'

const TaskInput = (props) => { 
    return (
        <div>
            <h1>Hello, Enter you todo-list !</h1>
            <form>
                <input className="inputBlcok" type="text" />
                <input type="button" onClick={props.handle} />
            </form>
        </div>
    )
}


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks :['哈哈','粗雌'],
            taskText: '',
            id: 0
        }

        this.addTask = this.addTask.bind(this)
    }

    addTask(e) {
        const inputValue = 
        this.setState({
            tasks: [...this.state.tasks,inputValue],
            id: this.state.id + 1
        })
    }

        
    render() {
        const {tasks, taskText, id} = this.state

        return (
            <div>
                <TaskInput handle={this.addTask} />
                
                <div className="todo-list">
                    {tasks.map(task => (
                        <div>{task}</div>
                    ))}
                    <div>{id}</div>
                </div>
                
            </div>
            
        )
    }
}

export default App