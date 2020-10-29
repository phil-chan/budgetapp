import { combineReducers } from 'redux'

import auth from './auth'
import expenses from './expenses'

export default combineReducers({
  auth,
  expenses
})
