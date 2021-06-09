import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import UserInfo from '../UserInfo/index'
import * as activeReducer from '../../store/active';
import { Icon, useEditable, useOutsideClick } from '@chakra-ui/react';
import { AddIcon, SettingsIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons'
import './Channels.css';
import {
  Modal,
  Button,
  Lorem,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useClipboard,
  Flex,
  Input
} from "@chakra-ui/react"
import ServerInvite from '../Modals/ServerInvite';
import ServerSettings from '../Modals/ServerSettings';
import ChannelSettings from '../Modals/ChannelSettings';
import CreateChannel from '../Modals/CreateChannel';

const Channels = ({server}) => {
  const user = useSelector(state => state.session.user);
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const servers = useSelector(state => state.server.servers);
  const history = useHistory();
  const [activeChannel, setActiveChannel] = useState('');
  const [openServerSettings, setOpenServerSettings] = useState(false)
  const [openInviteModal, setOpenInviteModal] = useState(false)
  const [openServerSettingsModal, setOpenServerSettingsModal] = useState(false)
  const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false)
  const [openEditChannelModal, setOpenEditChannelModal] = useState(false)
  const [openLeaveServerModal, setOpenLeaveServerModal] = useState(false)
  const ref = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [hasCopied, setHasCopied] = useState(false)
  useOutsideClick({
    ref: ref,
    handler: () => setOpenServerSettings(false)
  })

  if (!user) {
    return <Redirect to="/login" />;
  }

  function handleChannelClick(channel) {
    dispatch(activeReducer.setActiveChannel(channel))
    setActiveChannel(channel.id)
    history.push(`/channels/@me/${server.id}/${channel.id}`)
  }

  const handleInviteClick = () => {
    setOpenInviteModal(true)
  }

  const handleChannelCreateClick = () => {
    setOpenCreateChannelModal(true)
  }

  const handleServerSettingsClick = () => {
    setOpenServerSettingsModal(true)
  }

  const handleCreateChannelClick = () => {
    setOpenCreateChannelModal(true)
  }

  const  handleLeaveServerClick = () => {
    setOpenLeaveServerModal(true)
  }

  const handleChannelSettingsClick = () => {
    setOpenEditChannelModal(true)
  }

  if (Object.keys(server).length === 0) {
    history.push('/channels/@me')
    return null
  } else if (server == undefined) {
    history.push('/channels/@me')
    dispatch(activeReducer.getActiveServer(serverId))
  }

  if (!server) {
   return null
  }
  const serverOwner = (server?.owner.id === user?.id)

  return (
    <div className='server-info-channel-container'>
      <div className='server-name-container' onClick={() => setOpenServerSettings(true)} >
        <h3 className='server-name'>{server.name}</h3>
        {openServerSettings &&
          <div className='server-settings-div' ref={ref}>
            <div onClick={handleInviteClick} className='server-invite-link-container'>
              <div className='server-invite-link'>Invite People</div>
              <div className='server-invite-icon-container'>
                <svg viewBox="0 0 24 24" height="16" width="16">
                  <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z"></path>
                </svg>
              </div>
            </div>


            { serverOwner &&
            <div onClick={handleServerSettingsClick} className='server-owner-settings-container'>
              <div className='server-owner-settings'>Server Settings</div>
              <SettingsIcon className='channel-settings-btn'/>
            </div>}


            { serverOwner &&
            <div onClick={handleCreateChannelClick} className='server-owner-create-channel-container'>
              <div className='server-owner-create-channel'>Create Channel</div>
              <div className='create-channel-icon-container'>
                <svg viewBox="0 0 24 24" height="16" width="16">
                  <path fill="currentColor" d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"></path>
                </svg>
              </div>
            </div>}



            {!serverOwner &&
              <div onClick={handleLeaveServerClick} className='leave-server-container'>
                <div className='leave-server-label'>Leave Server</div>
                <div className='leave-server-icon-container'>
                  <svg viewBox="0 0 24 24" height="16" width="16">
                    <path fill="currentColor" d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"></path>
                  </svg>
                </div>
            </div>
            }
          </div>
        }
        <div className='server-settings'>
          {!openServerSettings && <ChevronDownIcon className='server-settings-icon' w={20} h={20} color="red.400"/>}
          {openServerSettings && <CloseIcon className='server-settings-icon' w={10} h={10}/>}
        </div>
      </div>
      <div className='channels-container'>
        <div className='channels-title-container'>
          <h4 className='channels-title'>Text Channels</h4>
          {serverOwner &&
          <div className='add-channels-div'>
            <AddIcon onClick={handleChannelCreateClick} className='add-channels-icon'/>
          </div>
          }
        </div>
        {server.channels?.map((channel) => {
          return (
            <div key={channel.id} onClick={() => handleChannelClick(channel)} className={`channel-container ${channel.id === activeChannel ? 'active-channel': ''}`}>
              <div className='channel-name-container'>
                <div className='hashtag'>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path>
                  </svg>
                </div>
                <div className='channel-name'>
                  {channel.name}
                </div>
              </div>
              <div className='channel-setting-container' onClick={handleChannelSettingsClick}>
                {serverOwner && <SettingsIcon className='channel-settings-btn'/>}
              </div>
            </div>
          )
        })}
      </div>
      <Modal
        isOpen={openInviteModal}
        onClose={hasCopied}
      >
        <ModalContent>
          <ServerInvite setOpenInviteModal={setOpenInviteModal} setHasCopied={setHasCopied} hasCopied={hasCopied}/>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={openServerSettingsModal}
        onClose={hasCopied}
      >
        <ModalContent>
          <ServerSettings setOpenServerSettingsModal={setOpenServerSettingsModal}/>
        </ModalContent>

      </Modal>
      <Modal
        isOpen={openEditChannelModal}
      >
        <ModalContent>
          <ChannelSettings setOpenEditChannelModal={setOpenEditChannelModal}/>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={openCreateChannelModal}
      >
        <ModalContent>
          <CreateChannel setOpenCreateChannelModal={setOpenCreateChannelModal}/>
        </ModalContent>
      </Modal>
      <UserInfo />
    </div>
  )
};

export default Channels;
