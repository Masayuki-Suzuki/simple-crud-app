import React from 'react'
import * as axios from 'axios'
import 'babel-polyfill'

const URL = '/api/characters'

const RenderCharacterList = ({ characters, actions }) => {
  async function handleUpdateCharacter(id) {
    actions.onRequestData()
    const res = await axios.put(URL, { id }).catch((err) => {
      console.error(new Error(err))
      actions.onReceiveDataFailed(err)
      throw new Error(err)
    })
    actions.onReceiveData(res.data)
  }
  async function handleDeleteCharacter(id) {
    actions.onRequestData()
    const res = await axios({
      method: 'delete',
      url: URL,
      data: {
        id,
      },
    }).catch((err) => {
      console.error(new Error(err))
      actions.onReceiveDataFailed()
      throw new Error(err)
    })
    actions.onReceiveData(res.data)
  }
  let characterList
  if (characters.isFetching) {
    characterList = <li>Now Loading....</li>
  } else {
    characterList = characters.characterArray.map(character => (
      <li key={character._id}>
        {`${character.name}(${character.age})`}
        <button onClick={() => handleUpdateCharacter(character._id)}>+1</button>
        <button onClick={() => handleDeleteCharacter(character._id)}>delete</button>
      </li>
    ))
  }
  return <ul>{characterList}</ul>
}

const CharacterList = ({ characters, actions }) => {
  async function handleFetchData() {
    actions.onRequestData()
    const res = await axios.get(URL).catch((err) => {
      console.error(new Error(err))
      actions.onReceiveDataFailed(err)
      throw new Error(err)
    })
    actions.onReceiveData(res.data)
  }
  return (
    <div>
      <button onClick={() => handleFetchData()}>fetch data</button>
      <RenderCharacterList characters={characters} actions={actions} />
    </div>
  )
}

export default CharacterList
