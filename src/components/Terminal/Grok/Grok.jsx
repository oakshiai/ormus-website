import {css, cx} from '@emotion/css';

const styles = {
  grok: css({
    display: 'block',
  }),
};

const Grok = (props) => {
  console.log(props);
  return (
    <>
      Test<span style={{color: 'red'}}>red</span>black
    </>
  );
};

export {Grok};