const GET_CONVERSATIONS = 'conversation/getConversations'
const NEW_CONVERSATION = 'conversation/newConversation'

//Action Creater

const setConversations = (conversations) => {
    return {
        type: GET_CONVERSATIONS,
        conversations
    }
}

//Thunk

export const getUserConversations = (userId) => async (dispatch) => {
    const response = await fetch(`/api/convos/${userId}`)
    if(response.ok) {
        const conversations = await response.json()
        dispatch(setConversations(conversations))
    }
}

export const newConversation = (userId) => async (dispatch) => {
    const response = await fetch(`/api/convos/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId
        })
    })
    if(response.ok) {
        const conversationId = await response.json()
        return conversationId
    }
}





// Reducer
const initialState = {'conversations': {}};

const conversationReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CONVERSATIONS:
            newState = { ...state }
            newState.conversations = action.conversations

            return newState

        default:
            return state;
    }
};

export default conversationReducer;
