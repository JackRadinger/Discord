
//Action Verbs

const SET_SERVERS = 'server/setServers'
const CREATE_SERVER = 'server/createServer'


//Action Creater

const setServers = (servers) => {
    return {
        type: SET_SERVERS,
        servers
    }
}

const createServer = (server) => {
    return {
        type: CREATE_SERVER,
        server
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

export const createNewServer = (serverName, serverPicture, userId) => async (dispatch) => {

    const response = await fetch(`/api/servers/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId, serverName, serverPicture
        })
    })
    if(response.ok) {
        const server = await response.json()
        dispatch(createServer(server))
    }
}



// Reducer
const initialState = {'servers': []};

const serverReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case SET_SERVERS:
            newState = { ...state }
            newState.servers = [...action.servers]

            return newState
        case CREATE_SERVER:
            newState = { ...state }
            newState.servers = [...newState.servers, action.server]
            
            return newState
        default:
            return state;
    }
};

export default serverReducer;
