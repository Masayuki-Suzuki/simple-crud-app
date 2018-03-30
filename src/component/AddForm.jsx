import React from 'react'
import * as axios from 'axios'
import 'babel-polyfill'

const AddForm = ({ form, actions }) => {
  const { name, age } = form
  const POST_URL = '/api/characters'
  async function handleSubmit(e, onInitForm) {
    e.preventDefault()
    const res = await axios.post(POST_URL, { name, age }).catch(err => console.log(err))
    onInitForm(res)
  }
  return (
    <div>
      <form onSubmit={e => handleSubmit(e, actions.onInitForm)}>
        <label htmlFor="inputName">
          Name:&nbsp;
          <input id="inputName" type="text" value={name} onChange={e => actions.onChangeName(e.target.value)} placeholder="e.g.)John" />
        </label>
        <label htmlFor="inputAge">
          Age:&nbsp;
          <input itemID="iputAge" type="text" value={age} onChange={e => actions.onChangeAge(e.target.value)} placeholder="e.g.)20" />
        </label>
        <button>submit</button>
      </form>
    </div>
  )
}

export default AddForm
