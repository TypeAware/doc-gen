'use strict';

import {concat, Observable, zip, merge} from 'rxjs';
import {BehaviorSubject, ReplaySubject, pipe} from "rxjs";

import {takeUntil, takeWhile, toArray} from 'rxjs/operators';

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

const rs1 = new ReplaySubject(1);  // pass 1 to the constructor
const rs2 = new ReplaySubject(1);
const rs3 = new ReplaySubject(1);

rs1.next(1);
rs2.next(2);
rs3.next(3);

zip(rs1,rs2,rs3).pipe().subscribe(v => {
  
  console.log({v});
});



