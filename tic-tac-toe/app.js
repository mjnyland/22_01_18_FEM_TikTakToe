
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
        return;
    }

    checkFull(){
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
        
        var result;
        arrays.forEach(arr => {
            if (arr.includes(null) === false){
                this.checkWin(arr);
                result = this.result;
            }
        })
        return result;
    }

    checkWin(arr){
        var x = arr[0];
        const filteredArr = arr.filter(item => item === x);

        if(arr.length === filteredArr.length){
            return this.result = this.currentUser;
        }
    }

    declareGameOver(result, callback){
        callback(this.result)
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

        this.playerOneScore = this.createElement('button', 'player-one-score');
        this.tiesScore = this.createElement('button', 'ties-score');
        this.playerTwoScore = this.createElement('button', 'player-two-score');

        this.squaresCont.append(this.squareZero, this.squareOne, this.squareTwo, this.squareThree, this.squareFour, this.squareFive, this.squareSix, this.squareSeven, this.squareEight, this.playerOneScore, this.tiesScore, this.playerTwoScore);

        this.gameOverOverlay = this.getElement('.game-over-overlay');
        this.gameOverSubhead = this.createElement('h3', 'game-over-subhead');
        this.gameOverHeading = this.createElement('h1', 'game-over-heading');
        this.gameOverShadow = this.createElement('div', 'shadow')
        this.gameOverOverlay.append(this.gameOverSubhead, this.gameOverHeading);
        this.restartGameOverlay = this.getElement('.restart-game-overlay')

        this.body.append(this.gameOverShadow)
    }

    displayCurrTurn(user){
        console.log(user)
        switch (user){
            case 1: console.log('fired');
                    this.xTurn.style.display = 'block';
                    this.oTurn.style.display = 'none';
                    break;
            case 2: console.log('fired');
                    this.xTurn.style.display = 'none';
                    this.oTurn.style.display = 'block';
                    break;
        }
    }


    
    findSquares(){
        this.squares = document.querySelectorAll('.square')
        console.log(this.squares)
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

    displaySquares(square, user){
        const squares = document.querySelectorAll('.square');
        const targetSquare = squares[square];

        if(user === 1){
            targetSquare.classList.add('x-square');
            
        } else if (user === 2){
            targetSquare.classList.add('o-square');
        }
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
        console.log(result)
        if(result === 1){
            console.log('1 wins')
            this.gameOverHeading.style.color = '#F2B137';
        } else if (result === 2) {
            console.log('2 wins')
            this.gameOverHeading.style.color = '#31C3BD'
        }
        this.gameOverOverlay.style.display = 'flex';
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
        this.view.bindReplayModal(this.handleReplayModal)
    }

    handleMove = (square) => {
        this.model.makeMove(square);
        this.view.displaySquares(square, this.model.currentUser);


        this.handleWin(this.model.checkFull())
        this.view.displayCurrTurn(this.model.switchPlayer());
    };

    handleWin(result){
        return result ? this.view.displayGameOver(result) : null;
    }

    handleReplayModal = () => {
        this.view.resetSquares();
        this.model.resetBoard();
    }


}

const app = new Controller(new Model(), new View())