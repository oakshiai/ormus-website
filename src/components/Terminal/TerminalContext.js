import {
  createContext,
  useContext,
} from 'react';

const TerminalContext = createContext({
  width: 0,
  height: 0,
});

const useTerminal = () => {
  return useContext(TerminalContext);
};

export {TerminalContext, useTerminal};
