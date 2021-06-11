import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import '../ServerPage/ServerPage.css'
import UserInfo from '../UserInfo/index'
import * as activeReducer from '../../store/active';
import * as conversationReducer from '../../store/directMessages';
import Channels from '../Channels/index';
import ChannelMessages from '../ChannelMessages/index';
import ServerUsers from '../ServerUsers/index';
import './UserDMs.css'
import { AddIcon } from '@chakra-ui/icons'


const UserDMs = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const servers = useSelector(state => state.server.servers);
  const server = useSelector(state => state.active.server);
  const conversation = useSelector(state => state.active.conversation)
  const history = useHistory();
  const directMessages = useSelector(state => state.convo.conversations)
  const [activeConvo, setActiveConvo] = useState(conversation.id ? conversation.id : 'discovery')

  useEffect(async() => {
    await dispatch(conversationReducer.getUserConversations(user.id))
  }, [])

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (Object.keys(directMessages).length === 0) {
    return null
  }

  async function handleConvoClick(convo) {
    await dispatch(activeReducer.setActiveConversation(convo))
    history.push(`/channels/@me/${convo.id}`)
  }

  function handleDiscoveryClick() {
    history.push(`/channels/@me`)
  }

  return (
    <>
        <div className='server-info-channel-container container'>
            <div>
                <div className='stage-discovery-link' onClick={handleDiscoveryClick}>
                    <div className='stage-discovery-icon'>
                        <svg width="32" height="32" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14 13C14 14.1 13.1 15 12 15C10.9 15 10 14.1 10 13C10 11.9 10.9 11 12 11C13.1 11 14 11.9 14 13ZM8.5 20V19.5C8.5 17.8 9.94 16.5 12 16.5C14.06 16.5 15.5 17.8 15.5 19.5V20H8.5ZM7 13C7 10.24 9.24 8 12 8C14.76 8 17 10.24 17 13C17 13.91 16.74 14.75 16.31 15.49L17.62 16.25C18.17 15.29 18.5 14.19 18.5 13C18.5 9.42 15.58 6.5 12 6.5C8.42 6.5 5.5 9.42 5.5 13C5.5 14.18 5.82 15.29 6.38 16.25L7.69 15.49C7.26 14.75 7 13.91 7 13ZM2.5 13C2.5 7.75 6.75 3.5 12 3.5C17.25 3.5 21.5 7.75 21.5 13C21.5 14.73 21.03 16.35 20.22 17.75L21.51 18.5C22.45 16.88 23 15 23 13C23 6.93 18.07 2 12 2C5.93 2 1 6.93 1 13C1 15 1.55 16.88 2.48 18.49L3.77 17.74C2.97 16.35 2.5 14.73 2.5 13Z" fill='currentColor'/>
                        </svg>
                    </div>
                    <div className='stage-discovery-title'>Stage Discovery</div>
                </div>
                <div className='direct-messages-container'>
                    <div className='direct-messages-title-container'>
                        <div className='direct-messages-title'>
                            DIRECT MESSAGES
                        </div>
                    </div>
                    <div className='user-conversations-container'>
                        {directMessages.map((directMessage) => {
                            return(
                                <div className={`user-pfp-name-container direct-message ${directMessage.id === activeConvo ? 'active-convo': ''}`} key={directMessage.id} onClick={() => handleConvoClick(directMessage)}>
                                    <div className='user-profile-picture-container'>
                                        <img className='user-profile-picture' src={user.id == directMessage.user_1.id ? directMessage.user_2.profilePicture : directMessage.user_1.profilePicture} />
                                    </div>
                                    <div className='user-username convo-username'>{user.id == directMessage.user_1.id ? directMessage.user_2.username : directMessage.user_1.username}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <UserInfo className='user-info'/>
        </div>
    </>
  )
};

export default UserDMs;
