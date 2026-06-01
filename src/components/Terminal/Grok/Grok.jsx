import {useTerminal} from '../TerminalContext.js';

const Line = ({from, to, color}) => {
  const width = to.x - from.x;
  const height = to.y - from.y;

  console.log(width, height);
  // TODO: Implement
};

const Text = ({from, color}) => {
  // TODO: Implement
};

const Grok = () => {
  const terminal = useTerminal();
  // TODO: Design and implement a drawing system where you can work on a canvas of characters, placing them on a 2D grid, if there's a conflict for a cell - the more recent element overwrites that cell.

  return (
    <>
      <Line from={{x: 0, y: 2}} to={{x: terminal.width, y: 2}} color="red" />
      <Line from={{x: 0, y: 3}} to={{x: 0, y: terminal.height}} color="black" />
      <Text from={{x: 10, y: 10}} color="orange">Something that goes on that line and breaks if needed</Text>
    </>
  );
};

export {Grok};
