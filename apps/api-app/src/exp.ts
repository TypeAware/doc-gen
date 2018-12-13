'use strict';

import {ReplaySubject} from "rxjs";
import {last, take, takeLast} from "rxjs/operators";

const rs = new ReplaySubject();

rs.next(1);
rs.next(2);
rs.next(3);


rs.pipe(takeLast(0)).subscribe(v => {
  console.log({v});
});

