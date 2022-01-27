
//Stores and modifies data
class Model{
    constructor(){
        //Default setttings for a new game
        this.board = {
            0: {
                isAvail: true,
                occupiedBy: null,
            },
            1: {
                isAvail: true,
                occupiedBy: null,
            },
            2: {
                isAvail: true,
                occupiedBy: null,
            },
            3: {
                isAvail: true,
                occupiedBy: null,
            },
            4: {
                isAvail: true,
                occupiedBy: null,
            },
            5: {
                isAvail: true,
                occupiedBy: null,
            },
            6: {
                isAvail: true,
                occupiedBy: null,
            },
            7: {
                isAvail: true,
                occupiedBy: null,
            },
            8: {
                isAvail: true,
                occupiedBy: null,
            }
            
        };

        this.currentUser = 1;
        this.result = null;
        
        if(localStorage.length > 0){
            this.score = {
                xScore: parseInt(localStorage.getItem('xScore')),
                ties: parseInt(localStorage.getItem('ties')),
                yScore: parseInt(localStorage.getItem('yScore')),
            }
        } else {
            this.score = {
                xScore: 0,
                ties: 0,
                yScore: 0
            }
        } 
    }

    setLocalStorageScore(){
        console.log('fired')
        localStorage.setItem('xScore', `${this.score.xScore}`);
        localStorage.setItem('yScore', `${this.score.yScore}`);
        localStorage.setItem('ties', `${this.score.ties}`);
    }

    switchPlayer(){
        if(this.currentUser === 1){
            this.currentUser = 2;
        } else {
            this.currentUser = 1;
        }
        return this.currentUser;
    }

    notAvail(){
        return;
    }

    checkResult() {
        const allSquares = [this.board[0].occupiedBy, this.board[1].occupiedBy, this.board[2].occupiedBy,
        this.board[3].occupiedBy, this.board[4].occupiedBy, this.board[5].occupiedBy, this.board[6].occupiedBy,
        this.board[7].occupiedBy, this.board[8].occupiedBy]

        const arrays = [
            [this.board[0].occupiedBy, this.board[1].occupiedBy, this.board[2].occupiedBy],
            [this.board[3].occupiedBy, this.board[4].occupiedBy, this.board[5].occupiedBy],
            [this.board[6].occupiedBy, this.board[7].occupiedBy, this.board[8].occupiedBy],

            [this.board[0].occupiedBy, this.board[3].occupiedBy, this.board[6].occupiedBy],
            [this.board[1].occupiedBy, this.board[4].occupiedBy, this.board[7].occupiedBy],
            [this.board[2].occupiedBy, this.board[5].occupiedBy, this.board[8].occupiedBy],

            [this.board[0].occupiedBy, this.board[4].occupiedBy, this.board[8].occupiedBy],
            [this.board[2].occupiedBy, this.board[4].occupiedBy, this.board[6].occupiedBy]    
        ]

        let result;

        arrays.forEach(arr => {
            if(this.checkWin(arr)){
                result = this.checkWin(arr);
            }
        })

        if (result === undefined){
            result = this.checkTie(allSquares);
        }

        if(result){
            this.result = result;
        }

        return result;
    }

    checkWin(arr){
        if(arr.includes(null) === false){
            var x = arr[0];
            const filteredArr = arr.filter(item => item === x);
            if(arr.length === filteredArr.length){
                return this.currentUser;
            }
        }
    }

    checkTie(arr){
        if (arr.includes(null) === false){
            return 'tie';
        }
    }


    makeMove(square){
        const targetSquare = this.board[square];
        if(targetSquare.isAvail === true){
            targetSquare.occupiedBy = this.currentUser;
            targetSquare.isAvail = false;
        } else {
            this.notAvail();
        }
    }

    resetBoard(){
        for(let i = 0; i < 8; i++){
            this.board[i].isAvail = true;
            this.board[i].occupiedBy = null;
        }

        this.currentUser = 1;
    }

}

//Anything relating to the DOM should be stored in here

class View{
    constructor(){
        this.body = this.getElement('body')

        this.squaresCont = this.getElement('.square-container');
        this.turnButton = this.getElement('.turn-button');
        this.xTurn = this.getElement('.x-icon');
        this.oTurn = this.getElement('.o-icon');
        this.replayButton = this.getElement('.replay-button');
        this.replayButtonModal = this.getElement('.restart-button');
        this.replayCancel = this.getElement('.cancel-button');

        this.squareZero = this.createElement('div', 'squareZero', 'square');
        this.squareOne = this.createElement('div', 'squareOne', 'square');
        this.squareTwo = this.createElement('div', 'squareTwo', 'square');
        this.squareThree = this.createElement('div', 'squareThree', 'square');
        this.squareFour = this.createElement('div', 'squareFour', 'square');
        this.squareFive = this.createElement('div', 'squareFive', 'square');
        this.squareSix = this.createElement('div', 'squareSix', 'square');
        this.squareSeven = this.createElement('div', 'squareSeven', 'square');
        this.squareEight = this.createElement('div', 'squareEight', 'square');
        this.playerOneScoreCont = this.getElement('.player-one-score-cont');
        this.playerOneScore = this.getElement('.player-one-score');
        this.tiesScore = this.getElement('.ties-score');
        this.playerTwoScore = this.getElement('.player-two-score');
        this.appendSquares([this.squareZero, this.squareOne, this.squareTwo, this.squareThree, this.squareFour, this.squareFive, this.squareSix, this.squareSeven, this.squareEight])


        this.gameOverOverlay = this.getElement('.game-over-overlay');
        this.gameOverSubhead = this.createElement('h3', 'game-over-subhead');
        this.gameOverHeading = this.createElement('h1', 'game-over-heading');
        this.gameOverShadow = this.createElement('div', 'shadow')
        this.gameOverOverlay.append(this.gameOverSubhead, this.gameOverHeading);
        this.restartGameOverlay = this.getElement('.restart-game-overlay')

        this.body.append(this.gameOverShadow)
    }


    createElement(tag, className, anotherClass){
        const element = document.createElement(tag);
        if(className) element.classList.add(className);
        if(anotherClass) element.classList.add(anotherClass);

        return element;
    }

    getElement(selector){
        const element = document.querySelector(selector);
    
        return element;
    }


    appendSquares(arr){
        arr.forEach(element => {
            this.squaresCont.insertBefore(element, this.playerOneScoreCont)
        })
    }

    displayCurrTurn(user){
        switch (user){
            case 1: 
                this.xTurn.style.display = 'block';
                this.oTurn.style.display = 'none';
                break;
            case 2: 
                this.xTurn.style.display = 'none';
                this.oTurn.style.display = 'block';
                break;
        }
    }

    displaySquares(square, user){
        const squares = document.querySelectorAll('.square');
        const targetSquare = squares[square];

        if(user === 1){
            targetSquare.classList.add('x-square');
            
        } else if (user === 2){
            targetSquare.classList.add('o-square');
        }
    }

    displayScore(x, t, y){
        this.playerOneScore.textContent = x;
        this.tiesScore.textContent = t;
        this.playerTwoScore.textContent = y;
    }

    checkMatch(target){
        const squares = document.querySelectorAll('.square');
        for (let i = 0; i < squares.length; i++){
            if (squares[i].className === target.className){
                return i;
            }
        }
    }

    bindMove(callback){
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', e => {
                const targetIndex = this.checkMatch(e.target);
                callback(targetIndex); 
            })

            square.addEventListener('mouseover', e => {
                square.innerHTML = `
                <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="#31C3BD" stroke-width="2" fill="none"/></svg>
                `
            })

            square.addEventListener('mousout', e => {
                square.innerHTML = '';
            })
        })
    }
    
    bindReplayModal(callback){
        this.replayButton.addEventListener('click', (e) => {
            this.restartGameOverlay.style.display = 'flex';
            this.gameOverShadow.style.display = 'block';

            callback()
        })
    }

    resetSquares(){
        this.replayButtonModal.addEventListener('click', (e) => {
            const xSquares = document.querySelectorAll('.x-square');
            const oSquares = document.querySelectorAll('.o-square');
            this.restartGameOverlay.style.display = 'none';
            this.gameOverShadow.style.display = 'none';

            for (let xSquare of xSquares){
                xSquare.classList.remove('x-square');
            }

            for (let oSquare of oSquares){
                oSquare.classList.remove('o-square');
            }

            this.displayCurrTurn(1)
        })

        this.replayCancel.addEventListener('click', (e) => {
            this.restartGameOverlay.style.display = 'none';
            this.gameOverShadow.style.display = 'none';
        })
    }



    displayGameOver(result){
        if(result === 1){
            this.gameOverHeading.style.color = '#31C3BD';
        } else if (result === 2) {
            this.gameOverHeading.style.color = '#F2B137';
        } else if (result === 'tie'){
            this.gameOverHeading.style.color = '#A8BFC9';
        }
        //this.gameOverOverlay.style.display = 'flex';
        this.gameOverShadow.style.display = 'block';
        this.gameOverHeading.textContent = `${result} TAKES THE ROUND`;
        this.gameOverSubhead.textContent = `PLAYER ${result} WINS!`;
    }
}


class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.view.bindMove(this.handleMove);
        this.view.bindReplayModal(this.handleReplayModal);
        
        if (localStorage.length > 0){
            const x = parseInt(localStorage.getItem('xScore'));
            const t = parseInt(localStorage.getItem('ties'))
            const y = parseInt(localStorage.getItem('yScore'))
            this.view.displayScore(x, t, y)
        } else {
            this.view.displayScore(this.model.score.xScore, this.model.score.ties, this.model.score.yScore);
        }
        
    }

    handleMove = (square) => {
        if(this.model.board[square].isAvail === true){
            this.model.makeMove(square);
            this.view.displaySquares(square, this.model.currentUser);
    
            this.model.checkResult()
            this.handleGameOver(this.model.result)
            this.view.displayCurrTurn(this.model.switchPlayer());
        }
    };

    handleGameOver(result){
        switch (result){
            case 1: 
                this.view.displayGameOver(result);
                this.model.score.xScore += 1;
                this.model.setLocalStorageScore();
                break;
            case 2:
                this.view.displayGameOver(result);
                this.model.score.yScore += 1;
                this.model.setLocalStorageScore()
                break;
            case 'tie':
                this.view.displayGameOver(result);
                this.model.score.ties += 1;
                this.model.setLocalStorageScore();
            default:
                break;
        }

        return result ? this.view.displayGameOver(result) : null;
    }

    handleReplayModal = () => {
        this.view.resetSquares();
        this.model.resetBoard();
    }


}

const app = new Controller(new Model(), new View())