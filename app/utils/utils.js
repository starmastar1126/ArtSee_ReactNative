import {Dimensions, Platform} from 'react-native'


export const stripHtml = (content) => content.replace(/<[^>]+>/g, '')

export const noop = () => {}

export const getErrorMessage = (error, errorMessage, t) => {
  return error && error.message ? stripHtml(error.message) : (errorMessage || t('defaultError'))
}

export const getExpectationLabel = (expectation, t) => {
  if (expectation === WEEKS_COUNT) {
    return t('haveGivenBirth')
  }
  return t('weeksPregnant', {count: expectation-1})
}


export const capitalizeText = (text) =>{
  let result = text;
  if(result)
  {
    result = result.split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  }
  return result;
}

export const isIphoneX = () =>{
  const dimen = Dimensions.get('window');
  return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
  );
}
export const getPureObject= (obj) =>{
  let result = {};
  Object.keys(obj).map(function(key, index) {
    result[key] = obj[key];
  });
  return result;
}