import {useState} from 'react';
import okLetsGo from "./audioFiles/ok-lets-go.mp3";
import animeWow from "./audioFiles/anime-wow.mp3";
import vineBoom from "./audioFiles/vine-boom.mp3";
import boo from "./audioFiles/boo-6377.mp3";
import space from './images/space.gif';

let count = 0; 

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

    //play sound
    const sound = new Audio(vineBoom);
    sound.play();

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
  let x = "X";
  let o = "O";
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
    const result = changeSymbol(nextSquares, x, o)
    const newSquares = result.squares;
    x = result.x;
    o = result.o;
    
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    // click counter
    count++;
  }

  const winner = calculateWinner(squares);
  let status;
  const sound = new Audio(animeWow); 
  if (winner) {
    if (winner == "X" || winner == "O"){
      status = "Winner: " + winner;
      sound.play(); 
    }
    else{
      const booSound = new Audio(boo); 
      status = winner;
      booSound.play(); 
    }
  
  } else {
    status = "Next player: " + (xIsNext ? x : o);
  }

  return (
    <div className="background">
      <div style ={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: '100vw',
        height: '100vh',
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
    else if ((squares[a] && squares[a] != 'X') && 
             (squares[b] && squares[b] != 'X') && 
             (squares[c] && squares[c] != 'X')){
      return 'O';
    }
    else if (count == 9){
      return 'Tie :('; 
    }
  }
  return null;
}

function changeSymbol(squares, x, o) {
  const symbols = ["@", "$", "%", "*", "?", "#", "~"]
  let temp1 = x;
  let temp2 = o;
  let rand = Math.floor(Math.random() * 7);
  x = symbols[rand];
  do {
    rand = Math.floor(Math.random() * 7);
  } while (rand === x)
  o = symbols[rand];

  const updateItems = (temp, y) => {
    const updated = squares.mao(square => (square === temp ? y : square));
    setSquares(updated);
  }
  const newSymbols = squares.map(symbol => {
    if (symbol === temp2) {
      return x;
    } else if (symbol === temp2) {
      return o;
    }
    return symbol;
  });
  return {
    squares: newSymbols, 
    x: x, 
    o: o
  };
}