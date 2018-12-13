'use strict';

import {OnDestroy} from "@angular/core";

export class CompBase implements OnDestroy {
  
  mounted = true;
  
  makePredicate(){
    return () => this.mounted;
  }
  
  ngOnDestroy(){
    this.mounted = false;
  }
  
}
