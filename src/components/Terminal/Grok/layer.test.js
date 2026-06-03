import assert from 'node:assert/strict';
import test from 'node:test';

import {createCanvas, renderCanvasToRows} from './canvas.js';
import {drawLine} from './drawLine.js';
import {drawString} from './drawString.js';
import {createLayer, drawLayer} from './layer.js';
import {moveTo} from './moveTo.js';

const renderLayerToRows = (layer) => {
  return Array.from({length: layer.height}, (_, y) => {
    const row = layer.rows[y] ?? [];

    return Array.from({length: layer.width}, (_, index) => row[index]?.contents ?? ' ').join('');
  });
};

test('measures the widest row and row count', () => {
  const layer = createLayer({rows: [
    'ab',
    'cde',
    ''
  ]});
  assert.equal(layer.width, 3);
  assert.equal(layer.height, 3);
});

test('createLayer initializes string rows as cells', () => {
  const layer = createLayer({rows: [
    'ab',
    'c d'
  ]});

  assert.deepEqual(renderLayerToRows(layer), [
    'ab ',
    'c d',
  ]);
  assert.deepEqual(layer.rows[0][0], {
    contents: 'a',
    color: undefined,
  });
});

test('createLayer applies a color to string row cells', () => {
  const layer = createLayer({
    rows: ['ab'],
    color: '#0f0'
  });

  assert.deepEqual(layer.rows[0], [
    {
      contents: 'a',
      color: '#0f0',
    },
    {
      contents: 'b',
      color: '#0f0',
    },
  ]);
});

test('createLayer initializes cell rows', () => {
  const layer = createLayer({rows: [
    [
      {contents: 'a', color: '#111'},
      {contents: 'b', color: '#222'},
    ],
  ]});

  assert.equal(layer.width, 2);
  assert.equal(layer.height, 1);
  assert.deepEqual(renderLayerToRows(layer), ['ab']);
  assert.deepEqual(layer.rows[0][1], {
    contents: 'b',
    color: '#222',
  });
});

test('createLayer applies a fallback color to cell rows', () => {
  const layer = createLayer({
    rows: [
      [
        {contents: 'a', color: '#111'},
        {contents: 'b', color: undefined},
      ],
    ],
    color: '#0f0'
  });

  assert.deepEqual(layer.rows[0], [
    {
      contents: 'a',
      color: '#111',
    },
    {
      contents: 'b',
      color: '#0f0',
    },
  ]);
});

test('drawString draws into layer local coordinates', () => {
  const layer = createLayer();

  drawString(layer, 'ab', {color: '#fff'});
  moveTo(layer, {x: 0, y: 1});
  drawString(layer, 'cd', {color: '#fff'});

  assert.equal(layer.width, 2);
  assert.equal(layer.height, 2);
  assert.deepEqual(renderLayerToRows(layer), [
    'ab',
    'cd',
  ]);
});

test('createLayer derives width and height from drawn rows', () => {
  const layer = createLayer();

  assert.equal(layer.width, 0);
  assert.equal(layer.height, 0);

  layer.rows[2] = [];
  layer.rows[2][4] = {
    contents: 'a',
    color: '#fff',
  };
  layer.rows[2][5] = {
    contents: 'b',
    color: '#fff',
  };

  assert.equal(layer.width, 6);
  assert.equal(layer.height, 3);
  assert.deepEqual(renderLayerToRows(layer), [
    '      ',
    '      ',
    '    ab',
  ]);
});

test('drawLayer composites a layer relative to the provided origin', () => {
  const canvas = createCanvas(8, 5);
  const layer = createLayer();

  drawString(layer, 'ab', {color: '#fff'});
  moveTo(layer, {x: 0, y: 1});
  drawLine(layer, {x: 3, y: 1}, {color: '#fff'});
  moveTo(layer, {x: 2, y: 2});
  drawString(layer, 'cd', {color: '#fff'});

  const frame = drawLayer(canvas, layer, {x: 2, y: 1});

  assert.deepEqual(frame, {
    x: 2,
    y: 1,
    width: 4,
    height: 3,
  });
  assert.deepEqual(renderCanvasToRows(canvas), [
    '        ',
    '  ab    ',
    '  ────  ',
    '    cd  ',
    '        ',
  ]);
});

test('drawLayer leaves regular spaces transparent', () => {
  const canvas = createCanvas(5, 3);
  const layer = createLayer();

  drawString(layer, 'a b', {color: '#fff'});

  drawLayer(canvas, layer, {x: 1, y: 1});

  assert.deepEqual(renderCanvasToRows(canvas), [
    '     ',
    ' a b ',
    '     ',
  ]);
  assert.equal(canvas.cells[(canvas.width * 1) + 2].color, undefined);
});
