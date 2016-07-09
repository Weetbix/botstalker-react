
export const SELECT_BOT = 'SELECT_BOT';
export function selectBot(apiKey) {
    return {
        type: SELECT_BOT,
        apiKey
    };
}
