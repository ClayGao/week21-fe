// App.js
import React, {Component} from 'react'
import './style.scss'

class Board extends Component {
    constructor(props){
        super(props)

        let squares = []
        for(let i = 0; i < 361; i++) {
            squares.push(
                {
                    playerColor : '',
                    squareId : i+1
                }
            )
        }
        this.state = {
            squares : squares,
            isBlack: true,
            gmaeIsOver: false
        }
        this.judgeWinner = this.judgeWinner.bind(this)
    }

    judgeWinner(id) {
        let x = id % 19 ? id % 19 : 19
        let y = Math.floor((id - 1 ) / 19) + 1

        function countExamination1(x, y, id) {
            let newX = 0
            let newY = 0
            let examinationPoint = 0
            const baseNum = Math.floor(id / 20) 
            if (baseNum >= x ) {
                 newX = 1 
            } else { newX = x - baseNum }
            newY = y - (x - newX)
            examinationPoint = 19 * (newY - 1) + (newX)
            return examinationPoint
        }

        function countExamination3(x, y, id) {
            let newX = 0
            let newY = 0
            let examinationPoint = 0
            const baseNum = Math.floor( (361 - id) / 18) 
            if (baseNum >= x ) {
                 newX = 1 
            } else { newX = x - baseNum }
            newY = y + (x - newX)
            examinationPoint = 19 * (newY - 1) + (newX)
            return examinationPoint
        }

        // 判斷獲勝
        function ChooseWinner(arr) {
            let sum = 1
            let winner = ''
            for (let i = 0;i < 19; i++) {
                if(arr[i] === arr[i+1] && (arr[i] === 'black' || arr[i] === 'white')) {
                    winner = arr[i]
                    sum++
                }
            }
            if (sum !== 5) {
                return
            }
            alert('遊戲結束 !，贏者是' + winner)
            this.setState({
                gmaeIsOver: true
            })
        }

        const examination1 = countExamination1(x,y,id) // 左上 -> 右下
        const examination2 = 19 * ( y - 1 ) + 1 // 左 -> 右
        const examination3 = countExamination3(x,y,id) // 左下 -> 右上
        const examination4 = 343 + ( x - 1) // 下 -> 上
       
        let listA = [], listB = [], listC = [], listD = []
        
        // 左上 -> 右下
        for (let i = 0; i < 19; i++) {
            this.state.squares.map(square => {
                if(square.squareId === examination1 + 20 * i) {
                    listA.push(square.playerColor)
                }
            })
        }
        ChooseWinner(listA)

        // 左 -> 右
        for (let i = 0; i < 19; i++) {
            this.state.squares.map(square => {
                if(square.squareId === examination2 + i) {
                    listB.push(square.playerColor)
                }
            })
        }
        ChooseWinner(listB)

        // 左下 -> 右上
        for (let i = 0; i < 19; i++) {
            this.state.squares.map(square => {
                if(square.squareId === examination3 - 18 * i) {
                    listC.push(square.playerColor)
                }
            })
        }
        ChooseWinner(listC)

        // 下 -> 上

        for (let i = 0; i < 19; i++) {
            this.state.squares.map(square => {
                if(square.squareId === examination4 -19 * i) {
                    listD.push(square.playerColor)
                }
            })
        }
        ChooseWinner(listD)

    }

    handleClick(id, playerIsBlack) {
        
        let turnIsDone = false;
        this.setState({
            squares: this.state.squares.map(square => {
                if(square.squareId === id && !square.playerColor) {
                    turnIsDone = true;
                    return {
                        ...square,
                        playerColor: playerIsBlack ? 'black' : 'white'
                    }
                } 
                return square
            }),
            isBlack : turnIsDone? !this.state.isBlack : this.state.isBlack
        },()=> {
            this.props.addRound()
            this.judgeWinner(id)
        })
    }

    shouldComponentUpdate(nextState){
        if (nextState.gmaeIsOver === true) return false
        return true
    }

    
    render() {
        const currentPlayer = this.state.isBlack
        const squares = this.state.squares
        return (
            <div className="board"> 
                {squares.map(square => ( 
                    <div className="square" 
                        id={square.squareId} 
                        onClick={this.handleClick.bind(this,square.squareId, currentPlayer)} 
                    >
                        <div className="x-line"></div>
                        <div className="y-line"></div>
                        <div className="piece-preview"></div>
                        <div className={square.playerColor}></div>
                    </div>
                ))}
            </div>
        )
    }
}


class Gobang extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameRound : 0
        }
    }

    handleRound() {
        this.setState({
            gameRound : this.state.gameRound + 1
        }) 
    }

    render() {
        return (
            <div>
                <div>第 {this.state.gameRound} 回合</div>
                <Board addRound={this.handleRound.bind(this)} />
            </div>
        )
    }
}

export default Gobang