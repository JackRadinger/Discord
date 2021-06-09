import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import './ServerUsers.css'

function ServerUsers() {
    const user = useSelector(state => state.session.user);
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const servers = useSelector(state => state.server.servers);
    const server = useSelector(state => state.active.server);
    const messages = useSelector(state => state.active.channel.messages)
    const users = useSelector(state => state.active.server.users)
    const history = useHistory();



    if (!user) {
    return null;
    }

    return (
        <div className='channel-users-container'>
            <div className='user-space'>

            </div>
            <div className='channel-users-title-container'>
                <h3 className='channel-users-title'>Users</h3>
            </div>
            <div className='channel-user-container'>
                {users?.map((user) => {
                    return (
                        <div className='user-container' key={user.id}>
                            <div className='server-user-pfp-container'>
                                <img className='server-user-pfp' src={user.profilePicture} />
                            </div>
                            <h4 className='server-username'>{user.username}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default ServerUsers;
