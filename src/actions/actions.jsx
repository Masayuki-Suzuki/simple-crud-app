import { createAction } from 'redux-actions'

export const changeName = createAction('CHANGE_NAME', (name = '') => ({ name }))
export const changeAge = createAction('CHANGE_AGE', (age = '') => ({ age }))
export const initializeForm = createAction('INITIALIZE_FORM')
