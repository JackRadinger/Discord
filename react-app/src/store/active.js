const SET_ACTIVE_SERVER = 'server/setActiveServer'
const SET_ACTIVE_CHANNEL = 'channel/setActiveChannel'
const SET_ACTIVE_CONVO = 'conversation/setActiveConvo'


//Action Creater

const setActiveServer = (activePage) => {
    return {
        type: SET_ACTIVE_SERVER,
        activePage
    }
}

const setChannel = (activeChannel) => {
    return {
        type: SET_ACTIVE_CHANNEL,
        activeChannel
    }
}

const setConversation = (activeConversation) => {
    return {
        type: SET_ACTIVE_CONVO,
        activeConversation
    }
}


//Thunk

export const setActivePage = (page) => async (dispatch) => {
    dispatch(setActiveServer(page))
}

export const getActiveServer = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/active/${serverId}`)
    if(response.ok) {
        const server = await response.json()
        dispatch(setActiveServer(server))
    }
}

export const setActiveChannel = (channel) => async (dispatch) => {
    dispatch(setChannel(channel))
}

export const setActiveConversation = (conversation) => async (dispatch) => {
    dispatch(setConversation(conversation))
}

export const getUserConversation = (conversationId) => async (dispatch) => {
    const response = await fetch(`/api/convos/conversation/${conversationId}`)
    if(response.ok) {
        const conversation = await response.json()
        dispatch(setConversation(conversation))
    }
}



// Reducer
const initialState = {'server': {}, 'channel': {}, 'conversation': {}};

const activeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case SET_ACTIVE_SERVER:
            newState = { ...state }
            newState.server = action.activePage
            return newState
        case SET_ACTIVE_CHANNEL:
            newState = { ...state }
            newState.channel = action.activeChannel
            return newState
        case SET_ACTIVE_CONVO:
            newState = { ...state }
            newState.conversation = action.activeConversation
            return newState
        default:
            return state;
    }
};

export default activeReducer;
