import Golomb from 'golomb';

export class BasicFilter {
  private _blockkey: Buffer;
  private _blockfilter: Golomb;

  constructor(blockhash: string, filter: string) {
    this._blockkey = getBlockKey(blockhash);
    this._blockfilter = Golomb.fromRaw(Buffer.from(filter, 'hex'));
  }

  match(item: Buffer): boolean {
    return this._blockfilter.match(this._blockkey, item);
  }

  matchAny(items: Buffer[]): boolean {
    return this._blockfilter.matchAny(this._blockkey, items);
  }

  filter(items: Buffer[]): Buffer[] {
    if (items.length === 0) return [];
    if (items.length === 1) return this.match(items[0]) ? items : [];

    if (!this.matchAny(items)) return [];

    const [left, right] = splitArray(items);
    return this.filter(left).concat(this.filter(right));
  }
}

function getBlockKey(blockhash: string): Buffer {
  if (blockhash.length !== 64) throw new Error('invalid blockhash');
  return Buffer.from(blockhash, 'hex').reverse().subarray(0, 16);
}

function splitArray<T>(a: Array<T>): [Array<T>, Array<T>] {
  if (a.length === 0) {
    throw new Error('cannot split empty array');
  }

  if (a.length === 1) {
    return [a, []];
  }

  const isEven = a.length % 2 === 0;
  if (isEven) {
    return [a.slice(0, a.length / 2), a.slice(a.length / 2)];
  }

  const first = a[0];

  const withoutFirst = a.slice(1);
  const [left, right] = splitArray(withoutFirst);
  return [[first, ...left], right];
}
