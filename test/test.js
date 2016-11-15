import { describe, it } from "mocha";
import LocalIdArray from '../src/LocalIdArray';
import { expect } from 'chai'

describe('local-id-array', function () {
  const array = [2, 3, 5, 7, 11, { x: 0 }, 'string', [6, 9]];
  const idArr = array.map((_, index) => index + 1);
  const iMap = array.reduce((obj, cur, index) => {
    obj[index + 1] = cur;
    return obj;
  }, {});

  const emptyLia = new LocalIdArray();
  const exLia = new LocalIdArray(array);

  describe('#constructor()', function () {
    it('init a empty object', function () {
      expect(emptyLia).to.deep.equal({
        array: [],
        __map__: {},
        __autoIncrement__: 1
      });
    });

    it('init with array', function () {
      expect(exLia).to.deep.equal({
        array: idArr,
        __map__: iMap,
        __autoIncrement__: array.length + 1
      });
    });

    it('init with local-id-array', function () {
      expect(new LocalIdArray(exLia)).to.deep.equal(exLia);
    });
  });

  describe('#push()', function () {
    it('works', function () {
      const newLia = exLia.push({ a: 1 }, 'string');
      expect(newLia).to.not.equal(exLia);
      expect(newLia).to.deep.equal({
        array: idArr.concat([array.length + 1, array.length + 2]),
        __map__: Object.assign({}, iMap, {
          [array.length + 1]: { a: 1 },
          [array.length + 2]: 'string'
        }),
        __autoIncrement__: array.length + 3
      });
    });
  });

  describe('#concat()', function () {
    it('works', function () {
      const newLia = exLia.concat([{ a: 1 }, 'string'], { b: 2 });
      expect(newLia).to.not.equal(exLia);
      expect(newLia).to.deep.equal({
        array: idArr.concat([array.length + 1, array.length + 2, array.length + 3]),
        __map__: Object.assign({}, iMap, {
          [array.length + 1]: { a: 1 },
          [array.length + 2]: 'string',
          [array.length + 3]: { b: 2 }
        }),
        __autoIncrement__: array.length + 4
      });
    });
  });

  describe('#unshift()', function () {
    it('works', function () {
      const newLia = exLia.unshift({ a: 1 }, 'string');
      expect(newLia).to.not.equal(exLia);
      expect(newLia).to.deep.equal({
        array: [array.length + 1, array.length + 2].concat(idArr),
        __map__: Object.assign({}, iMap, {
          [array.length + 1]: { a: 1 },
          [array.length + 2]: 'string'
        }),
        __autoIncrement__: array.length + 3
      });
    });
  });

  describe('#toArray()', function () {
    it('works', function () {
      expect(exLia.toArray()).to.not.equal(array);
      expect(exLia.toArray()).to.deep.equal(array);
    });
  });

  describe('#map()', function () {
    it('works', function () {
      const mapArr = exLia.map((item, id, index) => ({ item, id, index }));
      expect(mapArr).to.deep.equal(array.map((item, index) => ({
        item,
        id: index + 1,
        index
      })));
    });
  });

  describe('#slice()', function () {
    it('works', function () {
      const result = exLia.slice(5, 8);
      expect(result).to.not.equal(exLia);
      expect(result).to.deep.equal({
        array: [6, 7, 8],
        __map__: {
          [6]: { x: 0 },
          [7]: 'string',
          [8]: [6, 9]
        },
        __autoIncrement__: exLia.__autoIncrement__
      });
    });
  });

  describe('#splice()', function () {
    it('works', function () {
      const result = exLia.splice(1, 6, { name: 'i am an object' }, 'i am a string');
      expect(result).to.not.equal(exLia);
      expect(result).to.deep.equal({
        array: [1, 9, 10, 8],
        __map__: {
          [1]: 2,
          [8]: [6, 9],
          [9]: { name: 'i am an object' },
          [10]: 'i am a string'
        },
        __autoIncrement__: exLia.__autoIncrement__ + 2
      });
    });
  });

  describe('#length', function () {
    it('works', function () {
      expect(exLia.length).to.equal(array.length);
    });
  });

  describe('#at()', function () {
    it('works', function () {
      expect(exLia.at(1)).to.equal(array[1]);
    });
  });

  describe('#access like array', function () {
    it('works', function () {
      expect(exLia[1]).to.equal(array[1]);
    });
  });

  describe('#set()', function () {
    it('works', function () {
      const newArr = exLia.set(0, 'first item!');
      expect(newArr).to.not.equal(exLia);
      expect(newArr).to.deep.equal(new LocalIdArray(['first item!'].concat(array.slice(1))));
    });
  });
});