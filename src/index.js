import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Item(props){
    const color = props.board[props.col][props.row]
    return(
        <div data-row={props.row} 
            data-col={props.col} 
            className="item" 
            onClick={props.click}>
                <div className={`circle ${color}`} value={color}> </div>
        </div>
    )
}

class Game extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.resetGame = this.resetGame.bind(this)
        this.state = {
            //7 col and 6 rows
            board: [...Array(7)].map(i => Array(6).fill(null)), //allows easier access to columns
            yellowNext: true,
            win: false,
        }
    }
    
    resetGame(){
        this.setState({
            board: [...Array(7)].map(i => Array(6).fill(null)), 
            yellowNext: true,
            win: false,
        })
    }

    handleClick(i){
        if (this.state.win){return}
        const box = i.target.closest('.item');
        const col = parseInt(box.dataset.col);
        const board = this.state.board.slice();
        const next_row = 5 -  board[col].filter((i) => i != null).length
        if (next_row < 0){return} //prevent overflow
        board[col][next_row] = this.state.yellowNext ? 'Y' : 'R';
        const win = checkWinner(board, col,next_row)
        const new_state = win ? {board:board, win:win} : {board:board, yellowNext: !this.state.yellowNext}
        this.setState(new_state)
    }
    render(){
        return (
        <div className="container" id="game-view">
            <h1>Play Connect Four!</h1>

            <h4> {this.state.yellowNext ? 'Yellow': 'Red'} {this.state.win ? 'Wins!' : 'now playing'} </h4>
            <Board board = {this.state.board} handleClick={this.handleClick}
            resetGame={this.resetGame} yellowNext={this.state.yellowNext}
            win={this.state.win} />
            <button onClick= {this.resetGame}> Reset Game</button>
        </div>
        )
    }
}


function Board(props){
    const cols = [0,1,2,3,4,5]
    const rows= [0,1,2,3,4,5,6]
    const items = cols.map((r) => rows.map((c) => 
        <Item row={r} col={c} 
                color = {props.board[c][r]}
                key={c.toString()+r.toString()} 
                board = {props.board}
                click={props.handleClick}/>
        ))
    return <div className="board"> {items} </div>
}

// Render:
function App(){
    return <Game/>
}
ReactDOM.render(<App />, document.getElementById('root'));


//Game logic:
function checkWinner(arr, col, row){  
    for (let i = 0; i <4; i++){  //check column
        if(checkEqual(arr, col,row+i, col,row-1+i, col,row-2+i, col,row-3+i))
        {return true}
    } 
    for (let i = 0; i <4; i++){ //check row
         if(checkEqual(arr, col +i,row, col- 1+i,row, col -2+i,row, col -3+i,row)){
            return true
        } 
    }
    for (let i=0; i<4; i++){ //check left diagnal 
        if(checkEqual(arr, col +i,row +i, col- 1+i,row-1+i, col -2+i,row-2+i, col -3+i,row-3+i)){
            return true
        }
    }  
    for (let i=0; i<4; i++){ //check right diagnal
        if(checkEqual(arr, col -i,row +i, col+ 1-i,row-1+i, col +2-i,row-2+i, col +3-i,row-3+i)){
            return true
        }
    }
    return false
}

function checkEqual(arr, c1,r1,c2,r2,c3,r3,c4,r4){ 
    //refactor this after writing some tests
    const rows = [r1,r2,r3,r4]
    const cols = [c1,c2,c3,c4]
    const elements = []
    for (let i = 0; i<4; i++){
        try {
            if (arr[cols[i]] === undefined ||  arr[cols[i]] === null){
                return false           
            }if(arr[cols[i]][rows[i]] === undefined || arr[cols[i]][rows[i]] === null ){
                return false
            }
            else{
                elements.push(arr[cols[i]][rows[i]])
                 if (elements.length === 4){
                }
            }
        }catch(err){
            return false
        }
    }
    return elements.every( (i) => i === elements[0]);
}