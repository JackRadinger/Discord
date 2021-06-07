const SET_ACTIVE_SERVER = 'server/setActiveServer'
const SET_ACTIVE_CHANNEL = 'channel/setActiveChannel'


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



//Thunk

// export const getUserServers = (userId) => async (dispatch) => {
//     const response = await fetch(`/api/servers/${userId}`)
//     if(response.ok) {
//         const servers = await response.json()
//         dispatch(setServers(servers))
//     }
// }

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



// Reducer
const initialState = {'server': {}, 'channel': {}};

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
        default:
            return state;
    }
};

export default activeReducer;
