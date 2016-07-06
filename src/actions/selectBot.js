
export const SELECT_BOT = 'SELECT_BOT';
export function selectBot( api_key ){
    return {
        type: SELECT_BOT,
        api_key
    }
}