
//Action Verbs

const SET_SERVERS = 'server/setServers'


//Action Creater

const setServers = (servers) => {
    return {
        type: SET_SERVERS,
        servers
    }
}



//Thunk

export const getUserServers = (userId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${userId}`)
    if(response.ok) {
        const servers = await response.json()
        dispatch(setServers(servers))
    }
}



// Reducer
const initialState = {};

const serverReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case SET_SERVERS:
            newState = { ...state }
            newState = action.servers

            return newState
        default:
            return state;
    }
};

export default serverReducer;
