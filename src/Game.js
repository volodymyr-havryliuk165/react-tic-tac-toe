import { useState, useEffect, useLayoutEffect } from 'react';
import Cell from './Cell';
import checkWin from './checks';
import './field.css';

export default function Game() {
  const WIDTH = 3;
  const FIELD_SIZE = WIDTH * WIDTH;
  const emptyField = Array(FIELD_SIZE).fill('');

  const [field, setField] = useState(emptyField);
  const [player, setPlayer] = useState('x');
  const [gameWon, setWin] = useState(false);
  const [activeCell, setActive] = useState(0);

  let gameHeader = gameWon
  ? `Player ${gameWon} win!`
  : `Player ${player} turn`;

  useLayoutEffect(() => {
    if(checkWin(field)) {
      setWin((winner) => {
        return winner || player;
      });
    }
  }, [field, player]);

  useLayoutEffect(() => {
    setPlayer((old) => {
      if(old === 'x') {
        return 'o';
      } else {
        return 'x';
      }
    })
  }, [field]);

  useEffect(() => {
    function handleKeyPress(e) {
      switch (e.key) {
        case 'ArrowRight':
          if (activeCell < FIELD_SIZE - 1) setActive(activeCell + 1);
          break;
        case 'ArrowLeft':
          if (activeCell > 0) setActive(activeCell - 1);
          break;
        case 'ArrowDown':
          if (activeCell < FIELD_SIZE - WIDTH) setActive(activeCell + WIDTH);
          break;
        case 'ArrowUp':
          if (activeCell > WIDTH - 1) setActive(activeCell - WIDTH);
          break;
        case 'Enter':
          if(field[activeCell] === '' && !gameWon) {
            setField(field.map((value, index) => {
              if (index === activeCell) {
                return player;
              } else {
                return value;
              }
            }));
          }   
          break;
        default:
          break;
      }
    }

    window.addEventListener('keyup', handleKeyPress);
    return () => window.removeEventListener('keyup', handleKeyPress);
  });

  function handleReset() {
    setPlayer('');
    setField(emptyField);
    setWin(false);
    setActive(0);
  }

  function onClickHandler(idx) {
    setActive(idx);
    if (field[idx] !== '' || gameWon) return;
    const newField = [...field];
    newField[idx] = player;
    setField(newField);
  }

  return (
    <>
      <h2>{gameHeader}</h2>
      <div className="Game">
        {field.map((i, idx) => {
          return (
            <Cell
              key={idx}
              val={field[idx]}
              click={() => onClickHandler(idx)}
              isActive={idx===activeCell}
            />
          );
        })}
      </div>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
