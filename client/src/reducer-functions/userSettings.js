import {Map, fromJS, toJS, List} from 'immutable';
import underscore from 'underscore';

export function setState(state, newState) {
  return state.merge(newState);
}

export function chooseRole(state, choice) {
  return state.set('choice', choice);
}

export function setErrorMessage(state, error) {
  return state.set('errMessage', error);
}

export function addStudentIdentity(state, id, name) {
  const newState = fromJS({
    id: id,
    name: name,
  });
  return state.merge(newState);
}