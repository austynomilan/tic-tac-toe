const defaultGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
    let InitialGameBoard = defaultGameBoard

    for (const turn of turns){
        const {square, player} = turn
        const {row, col} = square

        InitialGameBoard[row][col] = player
    }

    // const [InitialGameBoard, setInitialGameBoard] = useState(defaultGameBoard)

    // const handleSelectBox = (rowIndex, colIndex) => {
    //     setInitialGameBoard((prevGameBoard) =>{
    //         const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol
    //         return updatedGameBoard
    //     })

    //     onSelectSquare()
    // }
    
  return (
    <ol id="game-board">
      {InitialGameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex)=> (
                <li key={colIndex}>
                    <button onClick={()=>onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
