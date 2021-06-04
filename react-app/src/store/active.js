const SET_ACTIVE = 'server/setActive'


//Action Creater

const setActive = (activePage) => {
    return {
        type: SET_ACTIVE,
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
    dispatch(setActive(page))
}



// Reducer
const initialState = {};

const activeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case SET_ACTIVE:
            newState = { ...state }
            newState = action.activePage

            return newState
        default:
            return state;
    }
};

export default activeReducer;
