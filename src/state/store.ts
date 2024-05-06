import { applyMiddleware, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import reducer from './reducers'

// @ts-ignore
export const store = createStore(reducer, applyMiddleware(thunk))

// Manual testing Redux store
store.dispatch({
  type: 'insert_cell_after',
  payload: { id: null, type: 'code' },
})

store.dispatch({
  type: 'insert_cell_after',
  payload: { id: null, type: 'text' },
})

const state = store.getState()

// console.log(state)
