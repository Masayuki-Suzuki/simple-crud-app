import React from 'react'
import axios from 'axios'
import 'babel-polyfill'

const URL = '/api/characters'

const TableRow = ({ character, actions }) => {
  async function handleUpdateCharacter(id, dec) {
    actions.onRequestData()
    const res = await axios.put(URL, { id, dec }).catch((err) => {
      console.error(new Error(err))
      actions.onReceiveDataFailed(err)
      throw new Error(err)
    })
    actions.onReceiveData(res.data)
  }
  async function handleDeleteCharacter(id) {
    actions.onRequestData()
    const res = await axios({
      method: 'DELETE',
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
  return (
    <tr className="list__row">
      <td className="list__name">{`${character.name}`}</td>
      <td>{`(${character.age})`}</td>
      <td>
        <button className="changeAge" onClick={() => handleUpdateCharacter(character._id, false)}>
          +1
        </button>
      </td>
      <td>
        <button className="changeAge" onClick={() => handleUpdateCharacter(character._id, true)}>
          -1
        </button>
      </td>
      <td>
        <button className="delBtn" onClick={() => handleDeleteCharacter(character._id)}>
          delete
        </button>
      </td>
    </tr>
  )
}

const DataTable = ({ characters, actions }) => {
  let tableDataAll
  if (characters.isFetching) {
    tableDataAll = <p>Now Loading....</p>
  } else {
    tableDataAll = (
      <table className="list">
        <tbody>
          <tr className="list__row">
            <th className="list__name list__name--head">Name</th>
            <th className="list__age">Age</th>
            <th className="list__inc">Age +1</th>
            <th className="list__dec">Age -1</th>
            <th className="list__del">Delete</th>
          </tr>
          {characters.characterArray.map(character => <TableRow key={`${character._id}`} character={character} actions={actions} />)}
        </tbody>
      </table>
    )
  }
  return tableDataAll
}

const CharacterList = ({ characters, actions }) => (
  <div className="listWrapper">
    <h2 className="list__hd">Persons List</h2>
    <DataTable characters={characters} actions={actions} />
  </div>
)

export default CharacterList
