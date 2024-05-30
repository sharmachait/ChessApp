import { chessProps } from './ChessBoard.types.ts';
import { useState } from 'react';
import { Color, PieceSymbol, Square } from 'chess.js';
import { MOVE } from '../pages/Game.tsx';

function ChessBoard(props: chessProps) {
  const board = props.board;
  const [from, setFrom] = useState<Square | null>(null);

  function handleClick(square: Square) {
    if (from === null) {
      setFrom(square);
    } else {
      console.log({ from: from, to: square });

      props.chess.move({ from: from, to: square });
      props.setBoard(props.chess.board());

      props.socket.send(
        JSON.stringify({
          type: MOVE,
          move: { from: from, to: square },
        })
      );

      setFrom(null);
    }
  }

  function getPiece(type: PieceSymbol, color: Color): string {
    let piece: string = color + type + '.png';
    return piece;
  }

  const boardToRender = props.isWhite ? board : [...board].reverse();

  return (
    <div className="text-white">
      {boardToRender.map((row, i) => {
        const rowToRender = props.isWhite ? row : [...row].reverse();
        return (
          <div className="flex" key={props.isWhite ? i : 7 - i}>
            {rowToRender.map((square, j) => {
              const adjustedJ = props.isWhite ? j : 7 - j;
              const sq = (String.fromCharCode(97 + adjustedJ) +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    handleClick(sq);
                  }}
                  className={`w-24 h-24 ${(i + j) % 2 ? 'bg-green-700' : 'bg-yellow-100'} flex justify-center items-center`}
                  key={props.isWhite ? j : 7 - j}
                >
                  {square ? (
                    <img
                      src={`/${getPiece(square.type, square.color)}`}
                      className={'w-16'}
                    />
                  ) : (
                    ''
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ChessBoard;
