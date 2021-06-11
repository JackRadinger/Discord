
//Action Verbs

const SET_SERVERS = 'server/setServers'
const CREATE_SERVER = 'server/createServer'
const EDIT_SERVER = 'servers/EDIT_SERVER'
const DELETE_SERVER = 'server/DELETE_SERVER'
const DELETE_CHANNEL = 'server/DELETE_CHANNEL';
const EDIT_CHANNEL = 'server/EDIT_CHANNEL';
const CREATE_CHANNEL = 'server/CREATE_CHANNEL';
const ALL_SERVERS = 'servers/ALL_SERVER';
const JOIN_SERVER = 'server/JOIN_SERVER';
const LEAVE_SERVER = 'server/LEAVE_SERVER';

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

const editServer = (server) => {
    return {
        type: EDIT_SERVER,
        server
    }
}

const deleteServer = (server) => ({
    type: DELETE_SERVER,
    server
});

const deleteChannel = (channel) => {
    return {
        type: DELETE_CHANNEL,
        channel
    }
}

const editChannel = (channel) => {
    return {
        type: EDIT_CHANNEL,
        channel
    }
}

const createChannel = (channel) => {
    return {
        type: CREATE_CHANNEL,
        channel
    }
}

const setAllServers = (servers) => {
    return {
        type: ALL_SERVERS,
        servers
    }
}

const joinServer = (server) => {
    return {
        type: JOIN_SERVER,
        server
    }
}

const leaveServer = (server) => {
    return {
        type: LEAVE_SERVER,
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

export const getServers = () => async (dispatch) => {
    const response = await fetch('/api/servers/all')
    if(response.ok) {
        const servers = await response.json()
        dispatch(setAllServers(servers))
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

export const editCurrentServer = (server) => async (dispatch) => {
    const res = await fetch(`/api/servers/${server.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: server.name,
            url: server.picture_url
        })
    });
    if (res.ok) {
        const server = await res.json();
        dispatch(editServer(server));
        return server;
    }
};

export const deleteCurrentServer = (server) => async (dispatch) => {
    const res = await fetch(`/api/servers/${server.id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(deleteServer(server));
    }
};

export const editCurrentChannel = (channel) => async (dispatch) => {
    const res = await fetch(`/api/servers/channel/${channel.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: channel.name,
        })
    });
    if (res.ok) {
        const channel = await res.json();
        dispatch(editChannel(channel));
        return channel;
    }
};

export const deleteCurrentChannel = (channel) => async (dispatch) => {
    const res = await fetch(`/api/servers/channel/${channel.id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(deleteChannel(channel));
    }
};

export const createNewChannel = (newChannel) => async (dispatch) => {
    const response = await fetch(`/api/servers/channel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newChannel.name,
            description: newChannel.description,
            server_id: newChannel.server_id
        })
    })
    if(response.ok) {
        const channel = await response.json()
        dispatch(createChannel(channel))
    }
}

export const joinNewServer = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/join/${serverId}`, {
        method: 'POST'
    })
    if(response.ok) {
        const server = await response.json()
        dispatch(joinServer(server))
    }
}

export const serverLeave = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/leave/${serverId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const server = await res.json();
        dispatch(leaveServer(server));
    }
};

// Reducer
const initialState = {'servers': [], 'allServers': []};

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
        case EDIT_SERVER:
            newState = { ...state }

            for(let i = 0; i < newState.servers.length; i++) {
                if (newState.servers[i].id === action.server.id ) {
                    newState.servers[i] = action.server
                }
            }

            return newState
        case DELETE_SERVER:
            newState = {... state }

            const index = newState.servers.indexOf(action.server)
            newState.servers.splice(index, 1);
            return newState
        case DELETE_CHANNEL:
            newState = { ...state }

            for(let i = 0; i < newState.servers.length; i++) {
                if (newState.servers[i].id === action.channel.server_id ) {
                    const index = newState.servers[i].channels.indexOf(action.channel)
                    newState.servers[i].channels.splice(index, 1)
                }
            }

            return newState
        case EDIT_CHANNEL:
            newState = { ...state }

            for(let i = 0; i < newState.servers.length; i++) {
                if (newState.servers[i].id === action.channel.server_id ) {
                    const server = newState.servers[i]
                    for(let j = 0; j < server.channels.length; j++) {
                        if (newState.servers[i].channels[j].id === action.channel.id) {
                            newState.servers[i].channels[j] = action.channel
                        }
                    }
                }
            }
            return newState
        case CREATE_CHANNEL:
            newState = { ...state }

            for(let i = 0; i < newState.servers.length; i++) {
                if (newState.servers[i].id === action.channel.server_id ) {
                    newState.servers[i].channels.push(action.channel)

                }
            }

            return newState
        case ALL_SERVERS:
            newState = { ...state }
            newState.allServers = action.servers
            return newState
        case JOIN_SERVER:
            newState = { ...state }
            newState.servers = [ ...newState.servers, action.server]
            return newState
        case LEAVE_SERVER:
            newState = { ...state }
            const serverIndex = newState.servers.indexOf(action.server)
            newState.servers.splice(serverIndex, 1);
            return newState
        default:
            return state;
    }
};

export default serverReducer;
