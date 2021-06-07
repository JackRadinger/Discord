import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import './ChannelMessage.css'

function ChannelMessages() {
    const user = useSelector(state => state.session.user);
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const servers = useSelector(state => state.server.servers);
    const server = useSelector(state => state.active.server);
    const messages = useSelector(state => state.active.channel.messages)
    const history = useHistory();



    if (!user) {
    return null;
    }

    return (
        <div className='channel-messages-container'>
            <div className='channel-message-container'>
                {messages.map((message) => {
                    return (
                        <div className='message-container' key={message.id}>
                            <div>
                                {/* <h4>{console.log(server.users.find(user => user.id === message.sender_id))}</h4> */}
                                <h4>{message.server.username}</h4>
                                <h6>{message.created_at}</h6>
                            </div>
                            <div>
                                {message.body}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='channel-message-input'>
                {/* <input>New Message</input> */}
                <div>
                    <div>
                        <div>
                            TEMP TEXT INPUT
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChannelMessages;
