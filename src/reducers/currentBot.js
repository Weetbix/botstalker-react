import * as Actions from '../actions/actions';

export function currentBot(state = '', action){
  switch(action.type){
    case Actions.SELECT_BOT:
      return action.api_key;
    default: 
      return state;
  }
}