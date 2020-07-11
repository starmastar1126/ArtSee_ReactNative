import { NavigationActions } from 'react-navigation'

// gets the current screen from navigation state
const getCurrentRouteName = (navigationState) => {
  if (navigationState && navigationState.index) {
    const route = navigationState.routes && navigationState.routes[navigationState.index]
    if (route === null || route === undefined)
      return null
    // dive into nested navigators
    if (route.routes) {
      return getCurrentRouteName(route)
    }
    return route.routeName
  }
  return null
}

const screenTracking = ({ getState }) => next => (action) => {
  if (
    action.type !== NavigationActions.NAVIGATE &&
    action.type !== NavigationActions.BACK
  ) {
    return next(action)
  }

  //const currentScreen = getCurrentRouteName(getState().nav)
  const result = next(action)
  ///const nextScreen = getCurrentRouteName(getState().nav)
  // if (nextScreen !== currentScreen) {
  //   try {
  //     console.tron.log(`NAVIGATING ${currentScreen} to ${nextScreen}`)
  //     // Example: Analytics.trackEvent('user_navigation', {currentScreen, nextScreen})
  //   } catch (e) {
  //     console.tron.log(e)
  //   }
  // }
  return result
}

export default screenTracking
