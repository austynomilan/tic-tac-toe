import { useState } from "react";
const defaultGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
    const [InitialGameBoard, setInitialGameBoard] = useState(defaultGameBoard)

    const handleSelectBox = (rowIndex, colIndex) => {
        setInitialGameBoard((prevGameBoard) =>{
            const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
            updatedGameBoard[rowIndex][colIndex] = 'X'
            return updatedGameBoard
        })
    }
    
  return (
    <ol id="game-board">
      {InitialGameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex)=> (
                <li key={colIndex}>
                    <button onClick={()=>handleSelectBox(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
