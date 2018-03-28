import { connect } from 'react-redux'
// import { createStore } from 'redux'
import App from './App'
// import rootReducer from '../reducers/reducers'

// const store = createStore(rootReducer, null)

const mapStateToProps = state => state

const mapDispatchToProps = () => {
  const test = () => {
    console.log('test')
  }
  return {
    test,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
