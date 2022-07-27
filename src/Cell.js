import React from 'react';
import './cell.css';

export default function Cell({
  val,
  click,
  isActive
}) {

  return (
    <div
      className={`game-cell${isActive? ' active':''}`}
      onClick={click}
    >
      <span className={val === 'x' ? 'x-cell' : 'o-cell'}>
        {val}
      </span>
    </div>
  );
}
