import {useTerminal} from '../TerminalContext.js';
import {drawInterface} from './drawInterface.js';

const Grok = (props) => {
  const terminal = useTerminal();
  const surface = drawInterface({
    width: terminal.width,
    height: terminal.height,
    ...props
  });

  return terminal.renderSurface(surface);
};

export {Grok};
