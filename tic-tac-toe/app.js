
//Stores and modifies data
class Model{
    constructor(){
        //Default setttings for a new game
        this.board = {
            0: {
                isAvail: true,
                occupiedBy: null,
                index: 0
            },
            1: {
                isAvail: true,
                occupiedBy: null,
                index: 1
            },
            2: {
                isAvail: true,
                occupiedBy: null,
                index: 2
            },
            3: {
                isAvail: true,
                occupiedBy: null,
                index: 3
            },
            4: {
                isAvail: true,
                occupiedBy: null,
                index: 4
            },
            5: {
                isAvail: true,
                occupiedBy: null,
                index: 5
            },
            6: {
                isAvail: true,
                occupiedBy: null,
                index: 6
            },
            7: {
                isAvail: true,
                occupiedBy: null,
                index: 7
            },
            8: {
                isAvail: true,
                occupiedBy: null,
                index: 8
            },
            

            avail(){
                let availSquares = [];
                for (let i = 0; i < 9; i++){
                    if(this[i].isAvail){
                        availSquares.push(this[i])
                    }
                }
                return availSquares
            }
        };
        this.arrays = [
            [this.board[0], this.board[1], this.board[2]],
            [this.board[3], this.board[4], this.board[5]],
            [this.board[6], this.board[7], this.board[8]],

            [this.board[0], this.board[3], this.board[6]],
            [this.board[1], this.board[4], this.board[7]],
            [this.board[2], this.board[5], this.board[8]],

            [this.board[0], this.board[4], this.board[8]],
            [this.board[2], this.board[4], this.board[6]]  
        ]

        this.currentUser = 1;
        this.result = null;
        this.gameMode = 'CPU';
        this.player1 = null;
        this.player2 = null;

        
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
        console.log('not available')
    }

    checkResult() {
        console.log('checking result')
        const allSquares = [this.board[0].occupiedBy, this.board[1].occupiedBy, this.board[2].occupiedBy,
        this.board[3].occupiedBy, this.board[4].occupiedBy, this.board[5].occupiedBy, this.board[6].occupiedBy,
        this.board[7].occupiedBy, this.board[8].occupiedBy]

        let obj = {
            winner: null,
            winningArr: null,
            winningPlayer: null
        }

        let result;
        let winningArr;
        let i = 0;

        this.arrays.forEach(arr => {
            let check = [arr[0].occupiedBy, arr[1].occupiedBy, arr[2].occupiedBy];
            if(this.checkWin(check)){
                result = this.checkWin(check);
                obj.winner = this.checkWin(check)
                winningArr = this.arrays[i];
                obj.winningArr = this.arrays[i]
            }
            i++;
        })

        console.log(result)

        if (result === undefined){
            result = this.checkTie(allSquares);
        }

        console.log(result)

        if(result){
            this.result = result;
            if(this.player1 === result){
                obj.winningPlayer = 'PLAYER 1'
            } else if (this.player2 === result){
                obj.winningPlayer = 'PLAYER 2'
            }
        }

        return obj;

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
        console.log(this.board)
        const targetSquare = this.board[square];
        if(targetSquare.isAvail === true){
            targetSquare.occupiedBy = this.currentUser;
            targetSquare.isAvail = false;
        } else {
            this.notAvail();
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    resetBoard(){
        for(let i = 0; i < 8; i++){
            this.board[i].isAvail = true;
            this.board[i].occupiedBy = null;
        }

        this.currentUser = 1;
    }

    makeEasyCPUMove(){
        const availSquares = this.board.avail();
        const targetSquare = availSquares[this.getRandomInt(availSquares.length)]
        targetSquare.isAvail = false;

        if(this.player1 === 1){
            targetSquare.occupiedBy = 2;
        } else if (this.player1 === 2){
            targetSquare.occupiedBy = 1;  
        }
        return targetSquare.index
    }

}

//Anything relating to the DOM should be stored in here

class View{
    constructor(){
        this.body = this.getElement('body')

        this.newGameOverlay = this.getElement('.new-game-overlay')
        this.pickO = this.getElement('.pick-o');
        this.pickX = this.getElement('.pick-x');
        this.newCPUButton = this.getElement('.CPU-mode-button');
        this.newMultiButton = this.getElement('.multiplayer-button')

        this.squaresCont = this.getElement('.square-container');
        this.turnButton = this.getElement('.turn-button');
        this.xTurn = this.getElement('.x-icon');
        this.oTurn = this.getElement('.o-icon');
        this.replayButton = this.getElement('.replay-button');
        this.replayButtonModal = this.getElement('.restart-button');
        this.replayCancel = this.getElement('.cancel-button');
        this.nextRoundButton = this.getElement('.next-round-button')

        this.playerOneScoreCont = this.getElement('.player-one-score-cont');
        this.playerOneScore = this.getElement('.player-one-score');
        this.tiesScore = this.getElement('.ties-score');
        this.playerTwoScore = this.getElement('.player-two-score');

        this.gameOverOverlay = this.getElement('.game-over-overlay');
        this.gameOverSubhead = this.createElement('h3', 'game-over-subhead');
        this.gameOverHeading = this.createElement('h1', 'game-over-heading');
        this.gameOverHeadingCont = this.getElement('.game-over-heading-cont');
        this.gameOverX = this.getElement('.game-over-x-solid')
        this.gameOverO = this.getElement('.game-over-o-solid')
        this.gameOverShadow = this.createElement('div', 'shadow')
        this.gameOverOverlay.insertBefore(this.gameOverSubhead, this.gameOverHeadingCont);
        this.gameOverHeadingCont.append(this.gameOverHeading)
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
            targetSquare.children[2].style.display = 'none';
            targetSquare.children[3].style.display = 'block';            
        } else if (user === 2){
            targetSquare.classList.add('o-square');
            targetSquare.children[0].style.display = 'none';
            targetSquare.children[1].style.display = 'block';
        }
    }

    displayScore(x, t, y){
        this.playerOneScore.textContent = x;
        this.tiesScore.textContent = t;
        this.playerTwoScore.textContent = y;
    }

    displayHover(element, user){
        if(element.classList.contains('x-square') === true || element.classList.contains('o-square') === true){
            return
        } else {
            const xStroke = element.children[2]
            const oStroke = element.children[0]
            if (user === 1){
                oStroke.style.display = 'none'
                xStroke.style.display = 'block'
    
            } else if (user === 2){
                xStroke.style.display = 'none'
                oStroke.style.display = 'block'
            }
        }
    }

    hideHover(element, user){
        const xStroke = element.children[2]
        const oStroke = element.children[0]

        xStroke.style.display = 'none'
        oStroke.style.display = 'none'
    }

    checkMatch(target){
        const squares = document.querySelectorAll('.square');
        for (let i = 0; i < squares.length; i++){
            if (squares[i].className === target.className){
                return i;
            }
        }
    }

    bindPickPlayer(callback){
        this.pickO.addEventListener('click', e => {
            callback(this.pickO)
        })

        this.pickX.addEventListener('click', e => {
            callback(this.pickX)
        })
    }

    bindNewGame(callback){
        this.newCPUButton.addEventListener('click', e => {
            callback(this.newCPUButton)
        })

        this.newMultiButton.addEventListener('click', e => {
            callback(this.newMultiButton)
        })

        this.nextRoundButton.addEventListener('click', e => {
            window.location.reload()
        })
    }


    bindMove(user, callback){
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {

            square.addEventListener('click', e => {
                const targetIndex = this.checkMatch(e.target);
                callback(targetIndex);
            })
        
            square.addEventListener('mouseover', e => {
                const targetIndex = this.checkMatch(e.target);
                this.displayHover(square, user);
            })

            square.addEventListener('mouseout', e => {
                const targetIndex = this.checkMatch(e.target);
                this.hideHover(square, user);
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

    resetSquares(callback){
        this.replayButtonModal.addEventListener('click', (e) => {
        
            const xSquares = document.querySelectorAll('.x-square');
            const oSquares = document.querySelectorAll('.o-square');
            this.restartGameOverlay.style.display = 'none';
            this.gameOverShadow.style.display = 'none';

            for (let xSquare of xSquares){
                xSquare.children[3].style.display = 'none';
                xSquare.classList.remove('x-square');
            }

            for (let oSquare of oSquares){
                oSquare.children[1].style.display = 'none';
                oSquare.classList.remove('o-square');
            }

            this.displayCurrTurn(1)
            callback()
        })

        this.replayCancel.addEventListener('click', (e) => {
            this.restartGameOverlay.style.display = 'none';
            this.gameOverShadow.style.display = 'none';
        })
    }



    displayGameOver(obj, result){
        console.log(obj)
        const winningPlayer = obj.winningPlayer;
        if(result === 1){
            this.gameOverX.style.display = 'inline';
            this.gameOverHeading.style.color = '#31C3BD';
            this.gameOverHeading.textContent = `TAKES THE ROUND`;
        } else if (result === 2) {
            this.gameOverO.style.display = 'inline';
            this.gameOverHeading.style.color = '#F2B137';
            this.gameOverHeading.textContent = `TAKES THE ROUND`;
        } else if (result === 'tie'){
            this.gameOverSubhead.style.display = 'none';
            this.gameOverHeading.style.color = '#A8BFC9';
            this.gameOverHeading.textContent = `ROUND TIED`;
        }
        this.gameOverOverlay.style.display = 'flex';
        this.gameOverShadow.style.display = 'block';

        if(winningPlayer){
            this.gameOverSubhead.textContent = `${winningPlayer} WINS!`;
        }
    }

    displayWinners(obj, result){

        const squares = document.querySelectorAll('.square');

        const winningSquareOne = squares[obj.winningArr[0].index] 
        const winningSquareTwo = squares[obj.winningArr[1].index] 
        const winningSquareThree = squares[obj.winningArr[2].index] 


        switch (result) {
            case 1:
                winningSquareOne.style.backgroundColor = '#31C3BD';
                winningSquareTwo.style.backgroundColor = '#31C3BD';
                winningSquareThree.style.backgroundColor = '#31C3BD';
                winningSquareOne.children[3].children[0].style.fill = '#1A2A33'
                winningSquareTwo.children[3].children[0].style.fill = '#1A2A33'
                winningSquareThree.children[3].children[0].style.fill = '#1A2A33'
                break;
            case 2:
                winningSquareOne.style.backgroundColor = '#F2B137';
                winningSquareTwo.style.backgroundColor = '#F2B137';
                winningSquareThree.style.backgroundColor = '#F2B137';
                winningSquareOne.children[1].children[0].style.fill = '#1A2A33'
                winningSquareTwo.children[1].children[0].style.fill = '#1A2A33'
                winningSquareThree.children[1].children[0].style.fill = '#1A2A33'
                break;
        }

    }
}


class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.view.bindPickPlayer(this.handlePickPlayer)
        this.view.bindNewGame(this.handleNewGame)
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



    handlePickPlayer = (target) => {
        const picked = document.querySelector('.picked')
        if(target === this.view.pickX){
            picked.classList.remove('picked')
            this.view.pickX.style.backgroundColor = '#A8BFC9';
            this.view.pickX.children[0].children[0].style.fill = '#1A2A33';
            this.view.pickX.classList.add('picked')

            this.view.pickO.style.backgroundColor = '#1A2A33';
            this.view.pickO.children[0].children[0].style.fill = '#A8BFC9';
        } else if (target === this.view.pickO){
            picked.classList.remove('picked')
            this.view.pickO.style.backgroundColor = '#A8BFC9';
            this.view.pickO.children[0].children[0].style.fill = '#1A2A33';
            this.view.pickO.classList.add('picked')

            this.view.pickX.style.backgroundColor = '#1A2A33';
            this.view.pickX.children[0].children[0].style.fill = '#A8BFC9';
        }
    }

    handleNewGame = (target) => {
        const pickedMark = document.querySelector('.picked')

        if(pickedMark === this.view.pickX){
            this.model.player1 = 1;
            this.model.player2 = 2;
        } else if (pickedMark === this.view.pickO){
            this.model.player1 = 2;
            this.model.player2 = 1;
        }

        if(target === this.view.newCPUButton){
            this.model.gameMode = 'CPU'
            if(this.model.player1 === 2){
                this.view.displaySquares(this.model.makeEasyCPUMove(), this.model.currentUser);
                this.view.displayCurrTurn(this.model.switchPlayer());
                this.view.bindMove(this.model.currentUser, this.handleMove)
            } else if (this.model.player1 === 1){
                this.view.bindMove(this.model.currentUser, this.handleMove)
            }
        } else if (target === this.view.newMultiButton){
            this.model.gameMode = 'multiplayer';
            this.view.bindMove(this.model.currentUser, this.handleMove)
        }
        this.view.newGameOverlay.style.display = 'none';
    }

    handleMove = (square) => {
        if(this.model.gameMode === 'multiplayer'){
            if(this.model.board[square].isAvail === true){
                this.model.makeMove(square);
                this.view.displaySquares(square, this.model.currentUser);
        
                this.model.checkResult()
                this.handleGameOver(this.model.result)
                this.view.displayCurrTurn(this.model.switchPlayer());
                this.view.bindMove(this.model.currentUser, this.handleMove);
            }
        } else if (this.model.gameMode === 'CPU') {
            //user move
            this.model.makeMove(square);
            this.view.displaySquares(square, this.model.currentUser);
            this.model.checkResult();
            this.handleGameOver(this.model.result)
            this.view.displayCurrTurn(this.model.switchPlayer())

            if(this.model.result === null){ // making sure there isn't a winner
            //cpu move
            this.view.displaySquares(this.model.makeEasyCPUMove(), this.model.currentUser);
            this.model.checkResult();
            this.handleGameOver(this.model.result)
            this.view.displayCurrTurn(this.model.switchPlayer())
            }
        }
    };

    handleGameOver(result){


        switch (result){
            case 1:
                this.view.displayWinners(this.model.checkResult(), result)
                this.view.displayGameOver(this.model.checkResult(), result);
                this.model.score.xScore += 1;
                this.model.setLocalStorageScore();
                break;
            case 2:
                this.view.displayWinners(this.model.checkResult(), result)
                this.view.displayGameOver(this.model.checkResult(), result);
                this.model.score.yScore += 1;
                this.model.setLocalStorageScore()
                break;
            case 'tie':
                console.log('tie detected')
                this.view.displayGameOver(this.model.checkResult(), result);
                this.model.score.ties += 1;
                this.model.setLocalStorageScore();
                break;
            default:
                break;
        }

        //return result ? this.view.displayGameOver(this.model.checkResult(), result) : null;
    }

    handleReset = () => {
        if(this.model.gameMode === 'CPU'){
            if(this.model.player1 === 2){
                this.view.displaySquares(this.model.makeEasyCPUMove(), this.model.currentUser);
                this.view.displayCurrTurn(this.model.switchPlayer());
            }
        }
    }

    handleReplayModal = () => {
        this.view.resetSquares(this.handleReset);
        this.model.resetBoard();
    }

    handleHover = () => {
        this.view.displayHover();
    }
}

const app = new Controller(new Model(), new View())