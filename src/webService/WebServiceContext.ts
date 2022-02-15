import React, { createContext } from 'react';
import {IWebService} from './index'

//set an empty object as default state
const Context = createContext({} as IWebService);
export default Context