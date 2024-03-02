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

let x = "X";
let o = "O";


export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [position, setPosition] = useState({ top: 20, left: 20 });
  const [backgroundColor, setBackgroundColor] = useState('white');

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Update the board position
    const newPosition = {
      top: Math.floor(Math.random() * (window.innerHeight - 50)),
      left: Math.floor(Math.random() * (window.innerWidth - 50)),
    };

    setPosition(newPosition);
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = x;
    } else {
      nextSquares[i] = o;
    }
    setSquares(nextSquares);
    // setSquares(changeSymbol(squares));
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? x : o);
  }

  return (
    <div style ={{
      position: 'absolute',
      top: `${position.top}px`,
      left: `${position.left}px`, 
    }}> 
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
    </div>
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

function changeSymbol(squares) {
  const symbols = ["@", "$", "%", "*", "?", "#", "~"]
  let temp1 = x;
  let temp2 = o;
  let ran = Math.floor(Math.random() * 6);
  x = symbols[ran];
  do{
    ran = Math.floor(Math.random() * 6);
  } while (ran === x)
  o = symbols[ran];

  const newSymbols = squares.map(symbol => {
    if(symbol === temp1) {
      return x;
    } else if (symbol === temp2) {
      return o;
    }
  });
  return newSymbols;
}
