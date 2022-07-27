import parseField from './fieldParser';

function checkRow(field, player) {
  const matrix = parseField(field);
  for (const row of matrix) {
    let win = true;
    for (let i = 0; i < row.length; i++) {
      if (row[i] !== player) win = false;
    }
    if (win) {
      return win;
    }
  }
}

function checkCol(field, player) {
  const matrix = parseField(field);
  for (let i = 0; i < matrix.length; i++) {
    let win = true;
    for (let j = 0; j < matrix[i].length; j++) {
      if(matrix[j][i] !== player) win = false;
    }
    if(win) {
      return win;
    }
  }
}

function checkMainDiag(field, player) {
  const matrix = parseField(field);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i === j) {
        if (matrix[i][j] !== player) {
          return false;
        }
      }
    }
  }
  return true;
}

function checkSecondDiag(field, player) {
  const matrix = parseField(field);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i + j === matrix.length - 1) {
        if (matrix[i][j] !== player) {
          return false;
        }
      }
    }
  }
  return true;
}

export default function checkWin(field, size = 3) {
  return (
    checkRow(field, 'x') ||
    checkMainDiag(field, 'x') ||
    checkSecondDiag(field, 'x') || 
    checkCol(field, 'x') || 
    checkRow(field, 'o') ||
    checkMainDiag(field, 'o') ||
    checkSecondDiag(field, 'o') || 
    checkCol(field, 'o') ||
    false
  );
}
