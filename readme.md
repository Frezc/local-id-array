This is a immutable array that maintain local id.
It's helpful for optimizing list render.

## Install

```
npm i -S local-id-array
```

## Usage

```jsx
import React from 'react';
import LocalIdArray from 'local-id-array';

class MyComponent extends React.PureComponent {
  
  render() {
    return (
      <ul>
        {this.props.list.map((item, id) => 
          <li key={id}>
            {item}
          </li>
        )}
      </ul>
    );
  }
}

class MyPage extends React.Component {
  state = {
    list: new LocalIdArray()
  };
  
  componentDidMount() {
    fetchData().then(json => this.setState((prevState) => ({ 
      list: prevState.list.concat(json.list)
    })));
  }
  
  render() {
    return (
      <div>
        <h1>MyPage</h1>
        <MyComponent list={this.state.list} />
      </div>
    );
  }
}
```

## API

- constructor
```javascript
const array = new LocalIdArray();
const array1 = new LocalIdArray([1, '2', { i: 3 }]);
const array2 = new LocalIdArray(array1)l
```

- push(...params : any) : LocalIdArray
```javascript
const array = new LocalIdArray();
// immutable
// newArr [{ name: 'obj' }, 3, 5]
const newArr = array.push({ name: 'obj' }, 3, 5); 
```

- concat(...params : any) : LocalIdArray
```javascript
const array = new LocalIdArray();
// newArr [{ name: 'obj' }, 3, 5]
const newArr = array.concat([{ name: 'obj' }, 3], 5); 
```

- unshift(...params : any) : LocalIdArray
```javascript
const array = new LocalIdArray();
// newArr [{ name: 'obj' }, 3, 5]
const newArr = array.unshift({ name: 'obj' }, 3, 5); 
```

- toArray() : Array
```javascript
const array = new LocalIdArray([{ name: 'obj' }, 3, 5]);
console.log(array.toArray()); // [{ name: 'obj' }, 3, 5]
```

- map(cb : func) : Array
```javascript
const array = new LocalIdArray([{ name: 'obj' }, 3, 5]);
const result = array.map((item, id, index) => ({ item, id, index }));
// [{ item: { name: 'obj' }, id: 1, index: 0 }, { item: 3, id: 2, index: 1 }, { item: 5, id: 3, index: 2 }]
console.log(result);
```

- slice(startIndex : number, endIndex : number) : LocalIdArray
```javascript
const array = new LocalIdArray([{ name: 'obj' }, 3, 5]);
// newArr [3]
const newArr = array.slice(1, 2);
```

- splice(start : number, deleteCount : number, ...items : any) : LocalIdArray
```javascript
const array = new LocalIdArray([{ name: 'obj' }, 3, 5]);
// immutable
// newArr [{ name: 'obj' }, 'new Item1', 2, 5]
const newArr = array.splice(1, 1, 'new Item1', 2);
```

- length : number
```javascript
const array = new LocalIdArray([{ name: 'obj' }, 3, 5]);
console.log(array.length); // 3
```

- at(index : number) : any
```javascript
const array = new LocalIdArray([{ name: 'obj' }, 3, 5]);
console.log(array.at(1)); // 3
```

- access like array (read only) (This feature need Proxy polyfill.)
```javascript
const array = new LocalIdArray([{ name: 'obj' }, 3, 5]);
console.log(array[1]); // 3
```

- set(index : number, value : any) : LocalIdArray
```javascript
const array = new LocalIdArray([{ name: 'obj' }, 3, 5]);
const newArr = array.set(0, 'string');
console.log(newArr.at(0)); // string
```