import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

const initialState = {
  form: {
    name: '',
    age: '',
  },
  characters: {
    isFetching: false,
    characterArray: [],
  },
}

const form = handleActions(
  {
    CHANGE_NAME: (state, action) => ({
      ...state,
      name: action.payload.name,
    }),
    CHANGE_AGE: (state, action) => ({
      ...state,
      age: action.payload.age,
    }),
    INITIALIZE_FORM: state => ({
      ...state,
      name: '',
      age: '',
    }),
  },
  initialState.form,
)

const characters = handleActions(
  {
    CHARA_DUMMY: state => state,
  },
  initialState.characters,
)

const rootReducer = combineReducers({
  form,
  characters,
})

// const rootReducer = {} // formReducer

export default rootReducer
