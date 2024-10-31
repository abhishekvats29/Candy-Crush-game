import React from 'react';
import './Game.css';

function Help() {
    return (
        <div className="help">
            <h2>How to Play</h2>
            <p>Starting the Game: The game starts automatically when the page loads.</p>
            <p>Matching Candies: Click and drag a candy to swap it with an adjacent candy. Create a match by aligning three or more candies of the same color in a row or column. Matched candies disappear, and new candies fall from the top to fill the gaps.</p>
            <h2>Controls</h2>
            <p>Restart Game: Click the "Restart Game" button to reset the game and start over.</p>
            <p>Stop Game: Click the "Stop Game" button to end the current game session.</p>
            <h2>Winning Criteria</h2>
            <p>Score 100 points to win the game. A "Congratulations!" message will appear once you hit the target score.</p>
        </div>
    );
}

export default Help;
