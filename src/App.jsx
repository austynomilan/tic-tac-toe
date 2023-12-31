import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './components/win_combination';

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function derivedWinner(InitialGameBoard, playerName){
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      InitialGameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      InitialGameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      InitialGameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      (firstSquareSymbol == secondSquareSymbol) &&
      (firstSquareSymbol == thirdSquareSymbol)
    ) {
      winner = playerName[firstSquareSymbol]
    }
  }
  return winner
}

function derivedGameBoard(gameTurns){
  let InitialGameBoard = [...defaultGameBoard.map(array =>[...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    InitialGameBoard[row][col] = player;
  }
  return InitialGameBoard
}
const defaultGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState({
    X: 'Player 1',
    O: 'Player 2'
  })
  const activePlayer = derivedActivePlayer(gameTurns);
  const InitialGameBoard = derivedGameBoard(gameTurns)
  const winner = derivedWinner(InitialGameBoard, playerName)
  const hasDraw = gameTurns.length === 9 && !winner;
  
  
  //the logic to update the players turns and the board state on a button click
  const handleSelectSquare = (rowIndex, colIndex) => {
  
  
    //updating the state of the array of the initial game board using the player turns
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  function handleRestart(){
      setGameTurns([]);
    }

  function handlePlayerName(symbol, newName){
    setPlayerName(prevPlayers =>{
      return{
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerName}/>
          <Player name='Player 2' symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch ={handleRestart}/>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={InitialGameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
