import {combineReducers} from 'redux';

import user from './user.js';
import forms from './forms.js';
import carts from './carts.js';
import example from './example.js';
import armatura from './armatura.js';

export default combineReducers({
  user,forms,carts,example,armatura
});