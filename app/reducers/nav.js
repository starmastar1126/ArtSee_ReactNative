import { RootNavigator } from '../navigation/AppNavigator'
var _routeName = null;
var _type = null;
export default (state, action) => {
  if(_routeName === null)
  {
    _routeName = action.routeName;
  }
  if (action.type.startsWith('Navigation/')) {
    const { type, routeName } = action
    if(routeName == _routeName && type == _type)
      return state;
    _routeName = routeName;
    _type = type;
  }
  
  return RootNavigator.router.getStateForAction(action, state)
}
export const goBack = () => ({ type: 'Navigation/BACK' })