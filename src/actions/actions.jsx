import { createAction } from 'redux-actions'

export const changeName = createAction('CHANGE_NAME', (name = '') => ({ name }))
export const changeAge = createAction('CHANGE_AGE', (age = '') => ({ age }))
export const initializeForm = createAction('INITIALIZE_FORM')

export const requestData = createAction('REQUEST_DATA')
export const receiveDataSuccess = createAction('RECEIVE_DATA_SUCCESS', (characterArray = []) => ({ characterArray }))
export const receiveDataFailed = createAction('RECEIVE_DATA_FAILED')
