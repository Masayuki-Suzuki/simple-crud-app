import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import AddForm from './AddForm'
import CharacterList from './CharacterList'
import { changeAge, changeName, initializeForm, receiveDataFailed, receiveDataSuccess, requestData } from '../actions/actions'

/* eslint react/prefer-stateless-function: 0 */
class App extends Component {
  componentDidMount() {
    this.getInitData()
  }
  async getInitData() {
    const { actions } = this.props
    const URL = '/api/characters'
    actions.onRequestData()
    const res = await axios.get(URL).catch((err) => {
      console.error(new Error(err))
      actions.onReceiveDataFailed(err)
      throw new Error(err)
    })
    actions.onReceiveData(res.data)
  }
  render() {
    return (
      <div>
        <AddForm form={this.props.form} actions={this.props.actions} />
        <CharacterList characters={this.props.characters} actions={this.props.actions} />
      </div>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => {
  const onInitForm = () => {
    dispatch(initializeForm())
  }
  const onChangeName = (val) => {
    dispatch(changeName(val))
  }
  const onChangeAge = (val) => {
    dispatch(changeAge(val))
  }
  const onRequestData = () => {
    dispatch(requestData())
  }
  const onReceiveData = (data) => {
    dispatch(receiveDataSuccess(data))
  }
  const onReceiveDataFailed = (err) => {
    console.log(err)
    dispatch(receiveDataFailed())
  }
  return {
    actions: {
      onInitForm,
      onChangeName,
      onChangeAge,
      onRequestData,
      onReceiveData,
      onReceiveDataFailed,
    },
  }
}

/* eslint-disable no-class-assign */
App = connect(mapStateToProps, mapDispatchToProps)(App)
/* eslint-enable no-class-assign */

export default App
