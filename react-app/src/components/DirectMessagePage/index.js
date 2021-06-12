import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import '../ServerPage/ServerPage.css';
import './DirectMessagePage.css';
import UserInfo from '../UserInfo/index'
import * as activeReducer from '../../store/active';
import Channels from '../Channels/index';
import ChannelMessages from '../ChannelMessages/index';
import ServerUsers from '../ServerUsers/index';
import UserDMs from '../UserDMs/index'
import socketUseEffect from '../utils/sockets'
import Moment from 'react-moment';

const DirectMessages = () => {
  const user = useSelector(state => state.session.user);
  const { conversationId } = useParams();
  const dispatch = useDispatch();
  const servers = useSelector(state => state.server.servers);
  const server = useSelector(state => state.active.server);
  const conversation = useSelector(state => state.active.conversation)
  const history = useHistory();
  const messageContainer = useRef(null);
  const [messages, setMessages] = useState([]);
  const socket = user.socket;
  const [initialMessages, setInitialMessages] = useState(true)
  const [message, setMessage] = useState('')
  const recipientId = user?.id == conversation?.user_1.id ? conversation?.user_2.id : conversation?.user_1.id

  useEffect(() => {
    messageContainer.current.scroll({
      top: messageContainer.current.scrollHeight,
      behavior: 'auto'
    });
    setMessages(conversation.messages)

}, [messageContainer.current, conversation, socket ])

useEffect(() => {
  messageContainer.current.scroll({
      top: messageContainer.current.scrollHeight,
      behavior: 'auto'
  });
  setInitialMessages(false)
}, [messages, messageContainer.current])

useEffect(socketUseEffect(
  "private",
  socket,
  setMessages,
  messages,
  null,
  conversation.id,
  recipientId
), [socket, conversation, messages]);

const updateMessage = (e) => {
  setMessage(e.target.value);
};

async function handleSubmit(e) {
    e.preventDefault()
    sendMessage(message)
    setMessage('')
}

function sendMessage(body) {
    socket.emit("private_chat", {
      sender_id: user.id,
      recipient_id: recipientId,
      conversation_id: conversation.id,
      body
    });
}

  if (!user) {
    return <Redirect to="/login" />;
  }

  if(!conversation) {
    history.push('/channels/@me')
  }

  return (
    <div className='main-content-container'>
      <div className='channel-messages-container'>
        <div className='conversation-title-container'>
          <div className='conversation-title'>
            {user.id == conversation.user_1.id ? conversation.user_2.username : conversation.user_1.username}
          </div>
        </div>
        <div className='fixed'/>
        <div ref={messageContainer} className='direct-message-container'>
          {messages.map((message, i) => {
              if (i == 0 || messages[i - 1].sender.id !== message.sender.id ) {
                return (
                  <div key={message.id} className='message-container'>
                    <div className='server-user-pfp-container'>
                      <img src={message.sender.profilePicture} alt='Profile Picture' className='server-user-pfp'/>
                    </div>
                    <div className='channel-message'>
                      <div className='channel-message-user-date-container'>
                          <h4 className='channel-message-username'>{message.sender.username}</h4>
                          <Moment className='channel-message-date' format="MMMM Do YYYY, h:mm:ss a">{message.created_at}</Moment>
                      </div>
                      <div className='user-message'>
                          {message.body}
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div key={message.id} className='single-message-container'>
                    <div className='user-message'>
                      {message.body}
                    </div>
                  </div>
                )
              }
          })}
        </div>
        <div className='channel-message-input-container'>
          <form onSubmit={handleSubmit} className='channel-message-form'>
            <div className='channel-message-input-div'>
              <input
              className='channel-message-input'
              value={message}
              onChange={updateMessage}
              >
              </input>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default DirectMessages;
