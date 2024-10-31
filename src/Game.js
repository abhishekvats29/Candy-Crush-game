import React, { useState, useEffect } from 'react';
import './Game.css';

const width = 8;
const candyColors = ['red', 'yellow', 'orange', 'purple', 'green', 'blue'];

const Game = () => {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
    const [draggedCandy, setDraggedCandy] = useState(null);
    const [replacedCandy, setReplacedCandy] = useState(null);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('playing');
    const [message, setMessage] = useState('');

    const checkForColumnOfFour = () => {
        for (let i = 0; i < 47; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === '';
            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                columnOfFour.forEach(square => currentColorArrangement[square] = '');
                setScore(prev => prev + 4);
                return true;
            }
        }
    };

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArrangement[i];
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
            const isBlank = currentColorArrangement[i] === '';
            if (notValid.includes(i)) continue;
            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                rowOfFour.forEach(square => currentColorArrangement[square] = '');
                setScore(prev => prev + 4);
                return true;
            }
        }
    };

    const checkForColumnOfThree = () => {
        for (let i = 0; i < 56; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === '';
            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                columnOfThree.forEach(square => currentColorArrangement[square] = '');
                setScore(prev => prev + 3);
                return true;
            }
        }
    };

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentColorArrangement[i];
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
            const isBlank = currentColorArrangement[i] === '';
            if (notValid.includes(i)) continue;
            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                rowOfThree.forEach(square => currentColorArrangement[square] = '');
                setScore(prev => prev + 3);
                return true;
            }
        }
    };

    const moveIntoSquareBelow = () => {
        for (let i = 0; i < 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);
            if (isFirstRow && currentColorArrangement[i] === '') {
                let randomNumber = Math.floor(Math.random() * candyColors.length);
                currentColorArrangement[i] = candyColors[randomNumber];
            }
            if ((currentColorArrangement[i + width]) === '') {
                currentColorArrangement[i + width] = currentColorArrangement[i];
                currentColorArrangement[i] = '';
            }
        }
    };

    const dragStart = (e) => {
        setDraggedCandy(e.target);
    };

    const dragDrop = (e) => {
        setReplacedCandy(e.target);
    };

    const dragEnd = () => {
        const draggedCandyId = parseInt(draggedCandy.getAttribute('data-id'));
        const replacedCandyId = parseInt(replacedCandy.getAttribute('data-id'));
        currentColorArrangement[replacedCandyId] = draggedCandy.style.backgroundColor;
        currentColorArrangement[draggedCandyId] = replacedCandy.style.backgroundColor;
        const validMoves = [
            draggedCandyId - 1,
            draggedCandyId + 1,
            draggedCandyId - width,
            draggedCandyId + width
        ];
        const validMove = validMoves.includes(replacedCandyId);
        const isAColumnOfFour = checkForColumnOfFour();
        const isARowOfFour = checkForRowOfFour();
        const isAColumnOfThree = checkForColumnOfThree();
        const isARowOfThree = checkForRowOfThree();
        if (replacedCandyId && validMove && (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)) {
            setDraggedCandy(null);
            setReplacedCandy(null);
        } else {
            currentColorArrangement[replacedCandyId] = replacedCandy.style.backgroundColor;
            currentColorArrangement[draggedCandyId] = draggedCandy.style.backgroundColor;
            setCurrentColorArrangement([...currentColorArrangement]);
        }
    };

    const touchStart = (e) => {
        e.preventDefault();
        setDraggedCandy(e.target);
    };

    const touchMove = (e) => {
        e.preventDefault();
        const touchLocation = e.targetTouches[0];
        const element = document.elementFromPoint(touchLocation.pageX, touchLocation.pageY);
        if (element && element.classList.contains('candy')) {
            setReplacedCandy(element);
        }
    };

    const touchEnd = () => {
        dragEnd();
    };

    const generateBoard = () => {
        const randomColorArrangement = [];
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
            randomColorArrangement.push(randomColor);
        }
        setCurrentColorArrangement(randomColorArrangement);
    };

    useEffect(() => {
        generateBoard();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setCurrentColorArrangement([...currentColorArrangement]);
        }, 100);
        return () => clearInterval(timer);
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement]);

    const restartGame = () => {
        setGameState('playing');
        setMessage('');
        setScore(0);
        generateBoard();
    };

    const stopGame = () => {
        setGameState('stopped');
        setMessage('Game stopped.');
    };

    const winGame = () => {
        setGameState('won');
        setMessage('Congratulations! You won the game!');
    };

    useEffect(() => {
        if (score >= 100) {
            winGame();
        }
    }, [score]);

    return (
        <div className="game">
            
            <h1>Candy Crush</h1>
            <div className="score">Score: {score}</div>
            <div className="game-message">{message}</div>

            <div className="game-board">
                {currentColorArrangement.map((candyColor, index) => (
                    <div
                        key={index}
                        data-id={index}
                        className="candy"
                        style={{ backgroundColor: candyColor }}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                        onTouchStart={touchStart}
                        onTouchMove={touchMove}
                        onTouchEnd={touchEnd}
                    ></div>
                ))}
            </div>
            <div className='button-container'>
            <button onClick={restartGame} className="game-button">Restart Game</button>
            <button onClick={stopGame} className="game-button">Stop Game</button>
            </div>
            </div>
    );
};

export default Game;
