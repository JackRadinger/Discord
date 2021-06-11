import { io } from 'socket.io-client';
let socket;

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const EDIT_USER = "session/EDIT_USER"

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
})

const setEdit = (user) => {
  return {
    type: EDIT_USER,
    user
  }
}

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    socket = io()
    socket.emit('login', {
      user_id: data.id
    })
    data.socket = socket;

    dispatch(setUser(data))
  }

  export const login = (email, password) => async (dispatch)  => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    socket = io()
    socket.emit('login', {
      user_id: data.id
    })
    data.socket = socket;

    dispatch(setUser(data))
    return {};
  }

  export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    dispatch(removeUser());
  };


  export const signUp = (username, email, password) => async (dispatch)  => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }

    socket = io()
    socket.emit('login', {
      user_id: data.id
    })
    data.socket = socket;

    dispatch(setUser(data))
    return {};
  }

  export const editProfilePicture = (pictureUrl, userId) => async (dispatch) => {
    const response = await fetch(`/api/users/edit/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify({
        pictureUrl
      })
    })
    const user = await response.json()
    dispatch(setEdit(user))
  }

export default function reducer(state=initialState, action) {
    let newState
    switch (action.type) {
        case SET_USER:
            return {user: action.payload}
        case REMOVE_USER:
            return {user: null}
        case EDIT_USER:
          newState = { ...state }
          newState.user = action.user

          return newState
        default:
            return state;
    }
}
