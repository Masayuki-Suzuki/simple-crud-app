import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddForm from './AddForm'
import CharacterList from './CharacterList'
import { changeAge, changeName, initializeForm } from '../actions/actions'

/* eslint react/prefer-stateless-function: 0 */
class App extends Component {
  render() {
    return (
      <div>
        <AddForm form={this.props.form} actions={this.props.actions} />
        <CharacterList characters={this.props.characters} />
      </div>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => {
  const onInitForm = (res) => {
    console.log(res)
    dispatch(initializeForm())
  }
  const onChangeName = (val) => {
    dispatch(changeName(val))
  }
  const onChangeAge = (val) => {
    dispatch(changeAge(val))
  }
  return {
    actions: {
      onInitForm,
      onChangeName,
      onChangeAge,
    },
  }
}

/* eslint-disable no-class-assign */
App = connect(mapStateToProps, mapDispatchToProps)(App)
/* eslint-enable no-class-assign */

export default App
