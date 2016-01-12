import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_PRESENTATION = 'GET_PRESENTATION'

// ------------------------------------
// Actions
// ------------------------------------
export const getPresentation = createAction(GET_PRESENTATION, (presentation = {}) => presentation)

export const actions = {
  getPresentation
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_PRESENTATION]: (state) => {
    fetch('/presentation').then(function (response) {
      return response
    }).catch(function (err) {
      state.err = err
      return state
    })
  }
}, [])
