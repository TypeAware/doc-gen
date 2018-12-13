'use strict';

import {BehaviorSubject, ReplaySubject} from "rxjs";
import {takeLast} from "rxjs/operators";

// const rs = new ReplaySubject(1);
// const bs = new BehaviorSubject(null);
//
// rs.next(1);
// rs.next(2);
// rs.next(3);
//
// console.log(bs.getValue());
//
// rs.pipe().subscribe(v => {
//
//   console.log({v});
// });
//

const rs = new ReplaySubject(1);  // pass 1 to the constructor

rs.next(1);
rs.next(2);
rs.next(3);

rs.subscribe(v => console.log('the value is:', v));
