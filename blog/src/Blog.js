import React, {Component} from 'react'
import './style.scss'
import getData from './ajax'

class List extends Component {
    render() {
        return (
            <span>List</span>
        )
    }
}

class InfoPage extends Component {
    render(){
        return (
            <span>About</span>
        )
    }
}

class Article extends Component {
    constructor(props) {
        super(props)
        let url = 'https://jsonplaceholder.typicode.com/posts'
        let articleData = []

        

        fetch(url, {method: 'get'})
            .then(function(resp) {
                console.log(resp.json())
                return resp.json()
            })
            .then(function(jsonData){
                infiState(jsonData);
            })
        
            

        
    }
    
    render(){
        console.log(this.state)
        return (
            <div className="article">
                <div className="article-title">
                    4564564564564564564564564
                </div>
                <div className="article-text">
                    4564565646456
                    55645646456
                    456456
                    4564565646456
                    55645646456
                    456456
                    4564565646456
                    55645646456
                    456456
                </div>
                <div className="article-editor">
                    Clay
                </div>
            </div>
        )
    }
}

class Blog extends Component {
    render() {
        return (
            <div className="Blog">
            <nav>
                <span>ClayGao's Blog</span>
                <List />
                <InfoPage />
            </nav>
            <div className="wrapper">
                <div className="board">
                    <Article />
                </div>
            </div>
            <footer>
                Bg-image By Unsplash
            </footer>
            </div>
        )
    }
}

export default Blog