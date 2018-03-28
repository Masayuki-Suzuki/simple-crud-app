import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddForm from './AddForm'
import CharacterList from './CharacterList'

/* eslint react/prefer-stateless-function: 0 */
class App extends Component {
  render() {
    return (
      <div>
        <AddForm store={this.props.store} />
        <CharacterList store={this.props.store} />
      </div>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => {
  const test = () => {
    console.log('test')
  }
  return {
    dispatch,
    test,
  }
}

/* eslint-disable no-class-assign */
App = connect(mapStateToProps, mapDispatchToProps)(App)
/* eslint-enable no-class-assign */

export default App
