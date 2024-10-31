import React, { useState } from 'react';
import Game from './Game';
import Help from './Help';
import './App.css';
import './VideoBackground.css';

function App() {
    const [showHelp, setShowHelp] = useState(false);

    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };

    return (
        <div className="App">
            <video autoPlay muted loop id="background-video">
                <source src="water.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content">
                {showHelp ? <Help /> : <Game />}
                <button onClick={toggleHelp} className="help-button">Help</button>
            </div>
        </div>
    );
}

export default App;
