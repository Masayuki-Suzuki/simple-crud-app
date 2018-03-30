import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

const initialState = {
  form: {
    name: '',
    age: '',
  },
  characters: {
    isFetching: false,
    characterArray: [
      {
        _id: 1,
        name: 'ヌル ヌル男',
        age: 'null',
      },
    ],
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
    REQUEST_DATA: state => ({
      ...state,
      isFetching: true,
    }),
    RECEIVE_DATA_SUCCESS: (state, action) => ({
      ...state,
      isFetching: false,
      characterArray: action.payload.characterArray,
    }),
    RECEIVE_DATA_FAILED: state => ({
      ...state,
      isFetching: false,
    }),
  },
  initialState.characters,
)

const rootReducer = combineReducers({
  form,
  characters,
})

// const rootReducer = {} // formReducer

export default rootReducer
