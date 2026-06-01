const createCanvas = (width, height) => {
  const size = width * height;

  return {
    width,
    height,
    cells: Array.from({length: size}, () => ({
      contents: ' ',
      color: undefined,
    })),
  };
};

export {createCanvas};