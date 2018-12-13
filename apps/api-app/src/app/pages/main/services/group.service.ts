'use strict';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class GroupService {

  constructor() {
  
  }
  
  groupList(field: string, list:Array<any>){
    console.log('group service args:', arguments);
    return Object.values( _.groupBy(list, field));
  }
  
  
}
