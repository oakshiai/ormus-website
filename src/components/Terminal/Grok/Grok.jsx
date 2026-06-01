import {useTerminal} from '../TerminalContext.js';

const Line = ({from, to}) => {
  const width = to.x - from.x;
  const height = to.y - from.y;

  console.log(width, height);
};

const Grok = () => {
  const terminal = useTerminal();
  console.log(terminal);

  return (
    <>
      <Line from={{x: 1, y: 2}} to={{x: 10, y:2}} />
      {Array.from(Array(110).keys()).map((_, index) => {
        return (
          <div key={index}>{index}Test<span style={{color: 'red'}}>red</span>black</div>
        );
      })}
    </>
  );
};

export {Grok};
