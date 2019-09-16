import React, {Component} from 'react'
import './style.scss'


function InfoPage(props) {
    return (
        <div  className="board">
            <div className="article">
                <div className="article-title">
                    Hi, Here is Blue Orange
                </div>
                <div className="article-editor">
                    第二十一週作業作業做很久 冏
                    第二十一週作業作業做很久 冏第二十一週作業作業做很久 冏
                    第二十一週作業作業做很久 冏
                    第二十一週作業作業做很久 冏
                    第二十一週作業作業做很久 冏
                    第二十一週作業作業做很久 冏
                    第二十一週作業作業做很久 冏
                    第二十一週作業作業做很久 冏
                </div>
            </div>
        </div>
    )
}

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSingleArticle: false,
            articleData: []
        }
        this.handleServerData = this.handleServerData.bind(this)
    }

    handleServerData() {
        let url = 'https://jsonplaceholder.typicode.com/posts'
        fetch(url)
            .then(resp => {
                return resp.json()
            })
            .then(jsonData => {
                 this.setState({
                        isSingleArticle: false,
                        articleData: jsonData
                 })
            })
    }
    
    handleSingleServerData(id = '') {
        let url = 'https://jsonplaceholder.typicode.com/posts'
        fetch(url + id)
            .then(resp => {
                return resp.json()
            })
            .then(jsonData => {
                 this.setState({
                        isSingleArticle: true,
                        articleData: jsonData
                 })
            })
    }
    

    componentDidMount() {
        this.handleServerData()
    }
    
    render(){
        const {isSingleArticle, articleData} = this.state
        return (
            <div  className="board">
            {articleData.map(card => (
                <div className="article" onClick={this.handleSingleServerData.bind(this,'?id='+ card.id)}>
                    <div className="article-title">
                        {card.title}
                    </div>
                    {isSingleArticle && <div className="article-text">{card.body}</div>}
                    <div className="article-editor">
                        Editor: {card.userId}
                    </div>
                    {isSingleArticle && <div className="article-back" onClick={this.handleServerData}>Go back</div>}
                </div>
            ))}
            </div>
        )
    }
}

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayMode : 'list',
        }
    }

    handleDisplayMode(mode) {
        this.setState({ displayMode : mode })
    }

    render() {
        console.log(this.state.displayMode)
        const displayMode = this.state.displayMode
        return (
            <div className="Blog">
                <nav>
                    <span>ClayGao's Blog</span>
                    <span onClick={this.handleDisplayMode.bind(this, 'info')}>About</span>
                    <span onClick={this.handleDisplayMode.bind(this, 'list')}>List</span>
                </nav>
                <div className="wrapper">
                        {displayMode === 'list' && <Article handeDisplayMode={this.handleDisplayMode} />}
                        {displayMode === 'info' && <InfoPage />}
                </div>
                <footer>
                    Bg-image By Unsplash
                </footer>
            </div>
        )
    }
}

export default Blog