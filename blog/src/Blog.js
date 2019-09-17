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
            articleData: [],
            isSingleArticle: false
        }
        this.handleServerData = this.handleServerData.bind(this)
        this.showArticle = this.showArticle.bind(this)
    }

    handleServerData() {
        let url = 'https://jsonplaceholder.typicode.com/posts'
        fetch(url)
            .then(resp => {
                return resp.json()
            })
            .then(jsonData => {
                jsonData.map(card => card.isShow = false)
                this.setState({
                    articleData: jsonData
                })
            })
    }

    componentDidMount() {
        this.handleServerData()
    }

    showArticle(id) {
        const {articleData} = this.state
        this.setState({
            articleData: articleData.map(card => {
                if (card.id === id) {
                    return {
                        ...card,
                        isShow: !card.isShow
                    } 
                } return card
            })
        })
    }
    
    render(){
        const articleData = this.state.articleData
        return (
            <div  className="board">
            {articleData.map(card => (
                <div key={card.id} 
                    className="article" 
                    onClick={this.showArticle.bind(this, card.id)}>
                    <div className="article-title">
                        {card.title}
                    </div>
                    {card.isShow && <div className="article-text">
                        {card.body}
                    </div>}
                    <div className="article-editor">
                        Editor: {card.userId}
                    </div>
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
        console.log('3')
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