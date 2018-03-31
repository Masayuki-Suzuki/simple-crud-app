import React from 'react'
import * as axios from 'axios'
import 'babel-polyfill'

const AddForm = ({ form, actions }) => {
  const { name, age } = form
  const POST_URL = '/api/characters'
  async function handleSubmit(e) {
    e.preventDefault()
    actions.onRequestData()
    const res = await axios.post(POST_URL, { name, age }).catch((err) => {
      console.log(err)
      actions.onReceiveDataFailed(err)
      throw new Error(err)
    })
    actions.onInitForm()
    actions.onReceiveData(res.data)
  }
  return (
    <div className="formContainer">
      <h2>Add New Person: </h2>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <label className="form__label form__label--name" htmlFor="inputName">
          <span className="form__title">Name</span>
          <input className="form__input" id="inputName" type="text" value={name} onChange={e => actions.onChangeName(e.target.value)} placeholder="e.g.)John" />
        </label>
        <label className="form__label form__label--age" htmlFor="inputAge">
          <span className="form__title">Age</span>
          <input className="form__input" id="iputAge" type="text" value={age} onChange={e => actions.onChangeAge(e.target.value)} placeholder="e.g.)20" />
        </label>
        <button className="form__submit">submit</button>
      </form>
    </div>
  )
}

export default AddForm
