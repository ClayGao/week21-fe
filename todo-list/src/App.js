// App.js
import React, {Component} from 'react'

const TaskInput = (props) => {
        return (
            <div>
                <h1>Hello, Enter you todo-list !</h1>
                <form>
                    <input />
                    <input type="button" onClick={props.handle} />
                </form>
            </div>
        )
    }


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks :['哈哈','粗雌']
        }

        this.addTask = this.addTask.bind(this)
    }

    addTask() {
        
        this.setState({
            tasks: this.state.tasks.push('ggg')
        })
        
       console.log('123')
    }

        
    render() {
        const {tasks} = this.state

        return (
            <div>
                <TaskInput handle={this.addTask} />
                
                <div className="todo-list">
                    {tasks.map(task => (
                        <div>{task}</div>
                    ))}
                </div>
                
            </div>
            
        )
    }
}

export default App