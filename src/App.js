import {useState} from 'react';

function generateRandomColor() {
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random()
      * (max - min + 1)) + min;
};

function Square({value, onSquareClick}) {
  const [isClicked, setIsClicked] = useState(false);

  const events = ['squareColourChange', 'squareBasic'];
  const [randomEvent, setRandomEvent] = useState('default');

  const [backgroundColor, setBackgroundColor] = useState('white');


  const handleClick = () => {
    // Toggle the clicked state
    setIsClicked(!isClicked);

    // Pass the click event to the parent component
    onSquareClick();
    
    // Random event 
    const randomIndex = Math.floor(Math.random() * events.length);
    const randomEvent = events[randomIndex];
    console.log("Event case: " + randomIndex);

    switch (randomEvent){
      case 'squareColourChange':{  
        setBackgroundColor(generateRandomColor());
        console.log("square colour changed");
        break;
      }
      case 'squareBasic':{
        setBackgroundColor("white");
        console.log("just white ");
        break;
      }
      default:
    }

  };

  return (
    <button
      className="square"
      onClick={handleClick}
      style={{ backgroundColor }}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

