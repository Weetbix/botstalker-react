import * as Actions from '../actions/selectBot';

export function currentBot(state = '', action){
  switch(action.type){
    case Actions.SELECT_BOT:
      return action.api_key;
    default: 
      return state;
  }
}