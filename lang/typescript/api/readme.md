


### Usage

Create a module like this:

```js

import {ExpressDocGen} from '@type.aware/docgen.api';

const d = new ExpressDocGen();

export const serve = d.serve();

export {d};


```