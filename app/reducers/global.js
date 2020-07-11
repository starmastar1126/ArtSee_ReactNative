// @flow
import createReducer from '../createReducer'

// ------------------------------------
// Constants
// ------------------------------------
export const STARTUP = 'Global.STARTUP'

// ------------------------------------
// Actions
// ------------------------------------
export const startup = () => ({ type: STARTUP })


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
}

export default createReducer(initialState, {
})

