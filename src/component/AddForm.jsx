import React from 'react'
import { changeName, changeAge } from '../actions/actions'

const AddForm = ({ store }) => {
  const { name, age } = store.getState().formReducer
  console.log(store.getState().formReducer)
  return (
    <div>
      <form>
        <label htmlFor="inputName">
          Name:&nbsp;
          <input itemID="inputName" type="text" value={name} onChange={e => store.dispatch(changeName(e.target.value))} />
        </label>
        <label htmlFor="inputAge">
          Age:&nbsp;
          <input itemID="iputAge" type="text" value={age} onChange={e => store.dispatch(changeAge(e.target.value))} />
        </label>
        <button>submit</button>
      </form>
    </div>
  )
}

export default AddForm
