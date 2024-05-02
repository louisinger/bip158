import test from 'ava';

import { BasicFilter } from './filter';

type Fixture = [
  blockhash: string,
  filter: string,
  inputs: string[],
  expected: string[]
];

const fixtures: Fixture[] = [
  [
    '000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943',
    '019dfca8',
    [
      '4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac',
    ],
    [
      '4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac',
    ],
  ],
  [
    '000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943',
    '019dfca8',
    ['2103f6d9ff4c12959445ca5549c811683bf9c88e637b222dd2e0311154c4c85cf423ac'],
    [],
  ],
  [
    '00000000fd3ceb2404ff07a785c7fdcc76619edc8ed61bd25134eaa22084366a',
    '0db414c859a07e8205876354a210a75042d0463404913d61a8e068e58a3ae2aa080026',
    [
      '76a9147779b7fba1c1e06b717069b80ca170e8b04458a488ac',
      '76a9142a0307cd925dbb66b534c4db33003dd18c57015788ac',
      '4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac',
    ],
    [
      '76a9147779b7fba1c1e06b717069b80ca170e8b04458a488ac',
      '76a9142a0307cd925dbb66b534c4db33003dd18c57015788ac',
    ],
  ],
];

test('BasicFilter', (t) => {
  for (const [blockhash, filter, inputs, expected] of fixtures) {
    const basicFilter = new BasicFilter(blockhash, filter);

    const result = basicFilter
      .filter(inputs.map((input) => Buffer.from(input, 'hex')))
      .map((buffer) => buffer.toString('hex'));

    t.deepEqual(result, expected);
  }
});
