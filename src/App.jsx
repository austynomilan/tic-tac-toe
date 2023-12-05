import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';


function App() {
  const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([])

  const handleSelectSquare = () =>{
    setActivePlayer((currentActive) => currentActive === 'X' ? 'O' : 'X')
  }


  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'}/>
          <Player name='Player 2' symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
      <Log />
    </main>
  );
}

export default App;
