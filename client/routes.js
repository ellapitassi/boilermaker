import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, Cart } from './components'
import store, { me, fetchTutors } from './store'
import TutorList from './components/tutorList.jsx'
import singleTutor from './components/singleTutor.jsx'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={UserHome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/shoppingcart" component={Cart} />
            <Route exact path="/tutors" render={() => (
              <TutorList
              isLoggedIn={isLoggedIn}
              gettingTutors={() => {
                store.dispatch(fetchTutors())
              }} />
            )} />
            <Route path="/tutors/:userId" component={singleTutor} />
            <Route path="/home" component={UserHome} />
            
            
              
            {/* Displays our Login component as a fallback */}

          <Route component={Login} />
          </Switch>

        </Main>
      </Router>
    )
  }
  }

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
