store-path
==========

Store middleware to get and set path on **[datastore](http://github.com/bredele/datastore)**.

## Installation

    $ component install bredele/store-path

## Usage

```js
var path = require('store-path');

var store = new Store();
store.use(path);

store.path('country.canada', 'canada');  //set
store.path('country.canada'); //get
```

Path is an elegant way to get nested data inside a store. 

## API

### .path(name, data)

 Set a path `name` with data object.

```js
store.path('country.canada,city','calgary');
```

  Emits `change` event with `country, value, previous value`.<br>
  Emits `change country` event with `value, previous value`.


Path also work with arrays:

```js
store.path('countries', ['france', 'canada']);
store.path('countries.0', 'england');
```

### .path(name)

 Get a path `name`.

```js
store.path('country.canada.city'); //calgary
```

## Browser Support

Store supports support all mainstream browsers from IE8+.


## License

The MIT License (MIT)

Copyright (c) 2014 Olivier Wietrich <olivier.wietrich@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
