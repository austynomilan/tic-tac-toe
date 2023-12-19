import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function derivedActivePlayer(gameTurns){
let currentPlayer = 'X';
      if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
      return currentPlayer;
}

function App() {
  //const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer  = derivedActivePlayer(gameTurns)

  //the logic to update the players turns and the board state on a button click
  const handleSelectSquare = (rowIndex, colIndex) => {
    //setActivePlayer((currentActive) => (currentActive === 'X' ? 'O' : 'X'));

    //updating the state of the array of the initial game board using the player turns
    setGameTurns((prevTurns) => {
      const currentPlayer  = derivedActivePlayer(prevTurns)
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player name='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns = {gameTurns}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
