import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import presentation from './modules/presentation'

export default combineReducers({
  presentation,
  router
})
