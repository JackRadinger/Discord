const SET_ACTIVE_SERVER = 'server/setActiveServer'


//Action Creater

const setActiveServer = (activePage) => {
    return {
        type: SET_ACTIVE_SERVER,
        activePage
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



// Reducer
const initialState = {'server': {}, 'channel': {}};

const activeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case SET_ACTIVE_SERVER:
            newState = { ...state }
            newState.server = action.activePage
            return newState
        default:
            return state;
    }
};

export default activeReducer;
