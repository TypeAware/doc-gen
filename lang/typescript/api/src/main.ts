'use strict';

import chalk from "chalk";
import * as safe from "@oresoftware/safe-stringify";
import log from "./logger";

import {flattenDeep, HTTPMethods} from "./shared";
import {RequestHandler} from 'express';
import {DocGen} from "./doc-gen";
import * as short from 'short-uuid';
import * as shortid from 'shortid';

export {ExpressRoute} from './expressjs/express-route';



export class TypeCreatorObject {
  TypeAwarePath: string;
  TypeCreatorMeta: {
    [key: string]: string
  }
}






