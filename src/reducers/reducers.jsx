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

const formReducer = handleActions(
  {
    CHANGE_NAME: (state, action) => ({
      ...state,
      name: action.payload.name,
    }),
    CHANGE_AGE: (state, action) => ({
      ...state,
      age: action.payload.age,
    }),
  },
  initialState.form,
)

const charactersReducer = handleActions(
  {
    CHARA_DUMMY: state => state,
  },
  initialState.characters,
)

const rootReducer = combineReducers({
  formReducer,
  charactersReducer,
})

// const rootReducer = {} // formReducer

export default rootReducer
