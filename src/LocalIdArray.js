import objectAssign from 'object-assign';

class LocalIdArray {

  constructor(arrayOrObj) {
    if (arrayOrObj instanceof LocalIdArray) {
      this.array = arrayOrObj.array.slice();
      this.__map__ = objectAssign({}, arrayOrObj.__map__);
      this.__autoIncrement__ = arrayOrObj.__autoIncrement__;
    } else if (Array.isArray(arrayOrObj)) {
      this.__map__ = {};
      this.__autoIncrement__ = 1;
      this.array = arrayOrObj.map((item, index) => {
        const currentIndex = this.__autoIncrement__++;
        this.__map__[currentIndex] = item;
        return currentIndex;
      });
    } else {
      this.array = [];
      this.__map__ = {};
      this.__autoIncrement__ = 1;
    }
  }

  push(...items) {
    const newObj = new LocalIdArray(this);
    newObj.array = newObj.array.concat(items.map((item) => {
      const currentIndex = newObj.__autoIncrement__++;
      newObj.__map__[currentIndex] = item;
      return currentIndex;
    }));
    return newObj;
  }

  concat(...params) {
    const data = [].concat(...params);
    return this.push(...data);
  }

  unshift(...items) {
    const newObj = new LocalIdArray(this);
    newObj.array = items.map((item) => {
      const currentIndex = newObj.__autoIncrement__++;
      newObj.__map__[currentIndex] = item;
      return currentIndex;
    }).concat(newObj.array);
    return newObj;
  }

  toArray() {
    return this.array.map((id) => this.__map__[id]);
  }

  map(cb) {
    return this.array.map((id, index) => cb && cb(this.__map__[id], id, index));
  }

  slice(...params) {
    const newObj = new LocalIdArray();
    newObj.array = this.array.slice(...params).map(id => {
      newObj.__map__[id] = this.__map__[id];
      return id;
    });
    newObj.__autoIncrement__ = this.__autoIncrement__;
    return newObj;
  }

  splice(...params) {
    const newObj = new LocalIdArray();
    newObj.__autoIncrement__ = this.__autoIncrement__;
    params = params.slice(0, 2).concat(params.slice(2).map(item => {
      const currentIndex = newObj.__autoIncrement__++;
      newObj.__map__[currentIndex] = item;
      return currentIndex;
    }));
    newObj.array = this.array.slice();
    newObj.array.splice(...params);
    newObj.array.forEach(id => {
      if (!newObj.__map__.hasOwnProperty(id)) {
        newObj.__map__[id] = this.__map__[id];
      }
    });
    return newObj;
  }
}

export default LocalIdArray;
