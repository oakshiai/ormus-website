import {css, cx} from '@emotion/css';

const styles = {
  terminal: css({
    display: 'block',
  }),
};

const Terminal = (props) => {
  // TODO: the intended use case is that within <pre> there will always be a component that expect a props.width and props.height in terms of monospaced characters, the job of the <Terminal> is to occupy the available space horizontal and vertical space up to floor value divided by the given font width/height and then pass on those values to children components that will re-render.
  return (
    <div className={cx(styles.terminal)}>
      <pre>
        {props.children}
      </pre>
    </div>
  );
};

export {Terminal};